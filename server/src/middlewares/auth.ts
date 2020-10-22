import 'dotenv/config';

import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export default (request: Request, response: Response, next: NextFunction) => {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    response.status(401).json({ message: 'Token not provided' });
  } else {
    const [, token] = authHeader.split(' '); //['bearer', 'token']

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET || 'default');

      request.userId = payload.userId;

      return next();
    } catch (error) {
      response.status(401).json({ message: 'Token is invalid' });
    }
  }

}