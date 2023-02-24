import { server } from './server';
import config from './config';

server.listen(config.port, () => {
    console.log(`Serving on http://localhost:${config.port}`);
});