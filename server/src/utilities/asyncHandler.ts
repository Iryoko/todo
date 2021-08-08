import { RequestHandler } from "express";

export const asyncHandler =
  (controller: RequestHandler): RequestHandler =>
  async (...args) => {
    try {
      await controller(...args);
    } catch (error) {
      const next = args[2];
      next(error);
    }
  };
