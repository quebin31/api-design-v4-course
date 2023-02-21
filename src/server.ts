import express from 'express';
import { router } from './router';
import morgan from 'morgan';

export const server = express();

server.use(morgan('dev'));
server.use('/api', router);
