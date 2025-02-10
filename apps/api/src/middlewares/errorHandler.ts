import { NextFunction, Request, Response } from "express";

interface ApiError extends Error {
  status?: number;
}

export const errorHandler = (
  error: ApiError,
  req: Request,
  res: Response,
  nexxt: NextFunction
) => {
  const statusCode = error.status || 500;
  console.log(error);
  res.status(statusCode).json({
    status: statusCode,
    message: error.message || "Internal Server Error",
  });
  return;
};
