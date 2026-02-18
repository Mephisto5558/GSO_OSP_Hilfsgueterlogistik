import { Authenticator } from 'passport';

// TODO: Implement sessionstore (with or without DB?) and login logic
const authenticator = new Authenticator().initialize();
export { authenticator };