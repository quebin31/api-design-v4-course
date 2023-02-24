import express from 'express';
import router from './router';
import morgan from 'morgan';
import { errorHandler } from './errors';

export const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', router);
server.use(errorHandler);