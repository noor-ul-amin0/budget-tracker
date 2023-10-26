import { NextFunction, Request, Response } from 'express';

function errorHandler(
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction
) {
  const statusCode = err.statusCode || 500;
  const success = err.success || false;
  const message = err.message || 'Internal Server Error';
  const error = process.env.NODE_ENV === 'development' ? err : {};

  res.status(statusCode).json({
    success,
    error,
    message,
  });
}

export default errorHandler;
