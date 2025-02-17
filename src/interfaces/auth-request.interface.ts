import { Request } from 'express';

export interface AuthRequest extends Request {
  user: {
    userId: string;
    email: string;
    // or whatever your JWT payload includes
  };
}