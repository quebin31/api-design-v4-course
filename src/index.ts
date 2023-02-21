import { server } from './server';

const port = 5001;

server.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`);
});