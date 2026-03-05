import { readdirSync } from 'node:fs';
import { join, parse, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Router } from 'express';


function isRouteModule(value: unknown): value is Router | { default: Router } {
  const maybeRouter = value && typeof value == 'object' && 'default' in value ? value.default : value;
  return typeof maybeRouter === 'function' && 'stack' in maybeRouter && Array.isArray(maybeRouter.stack);
}

const
  router = Router({ caseSensitive: false }),
  routesRoot = resolve(import.meta.dirname, '../routes');

// Dynamically import and register all route files
await Promise.all(readdirSync(routesRoot, { withFileTypes: true, recursive: true })
  .filter(file => file.isFile() && file.name.endsWith('.js'))
  .map(async file => {
    const
      relativePath = relative(routesRoot, file.parentPath),
      baseName = parse(file.name).name,
      routeParts = relativePath ? relativePath.split(sep) : [],
      route = `/${[...routeParts, baseName === 'index' ? '' : baseName].filter(Boolean).join('/')}`,
      module = await import(pathToFileURL(join(file.parentPath, file.name)).href) as unknown;

    if (!isRouteModule(module)) return;
    const routeHandler = 'default' in module ? module.default : module;

    router.use(route, routeHandler);

    const rootPath = route === '/' ? '' : route;
    for (const { route: subRoute } of routeHandler.stack) {
      if (!subRoute) continue;

      const fullPath = `${rootPath}${subRoute.path}` || '/';
      console.log(`[routes]: Registered ${Object.keys(subRoute.methods).join(', ').toUpperCase()} route ${fullPath}`);
    }
  }));

export { router };