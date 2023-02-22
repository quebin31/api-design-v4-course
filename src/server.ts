import express from 'express';
import { router } from './router';
import morgan from 'morgan';
import { authMiddleware } from './modules/auth';
import * as authHandlers from './handlers/auth';

export const server = express();

server.use(morgan('dev'));
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.post('/api/sign-up', authHandlers.signUp);
server.post('/api/sign-in', authHandlers.signIn);
server.use('/api', authMiddleware, router);
