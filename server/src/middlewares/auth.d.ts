import { Express } from 'express-serve-static-core';

declare module 'express-server-static-core' {
  export interface Request {
    userId?: number;
  }
}