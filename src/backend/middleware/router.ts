import { readdirSync } from 'node:fs';
import { join, parse, relative, resolve, sep } from 'node:path';
import { pathToFileURL } from 'node:url';
import { Router } from 'express';

const
  router = Router({ caseSensitive: false }),
  routesRoot = resolve(import.meta.dirname, '../routes');

router.get('/', (_req, res) => res.send('API is available'));

// Dynamically import and register all sibling route files
await Promise.all(
  readdirSync(routesRoot, { withFileTypes: true, recursive: true })
    .filter(file => file.isFile() && file.name.endsWith('.js'))
    .map(async file => {
      const
        relativePath = relative(routesRoot, file.parentPath),
        baseName = parse(file.name).name,
        routeParts = relativePath ? relativePath.split(sep) : [],
        route = `/${[...routeParts, baseName === 'index' ? '' : baseName].filter(Boolean).join('/')}`,

        /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
        { default: routeHandler } = await import(
          pathToFileURL(join(file.parentPath, file.name)).href
        ) as { default: Router };

      router.use(route, routeHandler);

      /* eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion */
      const routes = routeHandler.stack.map<[string, string[]] | undefined>(
        e => (e.route ? [e.route.path, Object.keys(e.route.methods)] : undefined)
      ).filter(Boolean) as [string, string[]][];

      for (const [subRoute, methods] of routes) {
        const fullPath = `${route === '/' ? '' : route}${subRoute}` || '/';
        console.log(`[routes]: Registered ${methods.join(', ').toUpperCase()} route ${fullPath}`);
      }
    })
);

export { router };