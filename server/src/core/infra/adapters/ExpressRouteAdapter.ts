import { Request, Response } from 'express';

import { Controller } from '../Controller';

export const routeAdapter = (controller: Controller) => {
  return (request: Request, response: Response) => {
    try {
      controller.handle(request, response);
    } catch (error) {
      response.status(500).json({ error: 'Error' });
    }
  }
}
