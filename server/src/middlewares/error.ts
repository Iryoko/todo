import { ErrorRequestHandler } from "express";

export const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  const { statusCode, message, data } = err;

  res.status(statusCode).json({
    status: "error",
    message,
    data,
  });
};
