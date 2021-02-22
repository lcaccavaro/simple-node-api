import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import AuthenticateUserService from '../../../services/AuthenticateService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const authenticateUser = container.resolve(AuthenticateUserService);

    const { user, token } = await authenticateUser.execute({
      email,
      password,
    });

    return response.json({ user: classToClass(user), token });
  }
}