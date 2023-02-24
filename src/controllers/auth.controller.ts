import { Request, Response } from 'express';
import * as authService from '../services/auth.service';

export async function signUp(req: Request, res: Response) {
    res.json(authService.register(req.body));
}

export async function signIn(req: Request, res: Response) {
    res.json(authService.validate(req.body));
}