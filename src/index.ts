import { server } from './server';
import dotenv from 'dotenv';

dotenv.config();
const port = parseInt(process.env.PORT ?? '5001');

server.listen(port, () => {
    console.log(`Serving on http://localhost:${port}`);
});