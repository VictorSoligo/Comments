import { Request, Response } from 'express';

import { Controller } from '../Controller';

export const routeAdapter = (controller: Controller) => {
  return async (request: Request, response: Response) => {
    try {
      await controller.handle(request, response);
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
