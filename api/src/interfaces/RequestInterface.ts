import { Request } from 'express';

export interface RequestInterface extends Request {
  user?: { userId: string };
}
