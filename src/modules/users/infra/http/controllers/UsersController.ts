import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import 'reflect-metadata';
import { container } from 'tsyringe';

import CreateUserService from '../../../services/CreateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserService);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToClass(user));
  }
}
