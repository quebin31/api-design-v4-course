import express, { NextFunction, Request, Response } from 'express';
import router from './router';
import morgan from 'morgan';

export const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/api', router);

server.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
    console.log(err);
    res.sendStatus(500);
});