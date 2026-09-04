import type { NextFunction, Request, Response } from 'express'

export function notFoundHandler(_req: Request, res: Response): void {
  res.status(404).json({
    message: 'Route not found',
  })
}

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  console.error(error)

  res.status(500).json({
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'production' ? undefined : error.message,
  })
}
