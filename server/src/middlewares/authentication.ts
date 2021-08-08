import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../utilities/errors";

export const authentication = (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  if (!req.session.user) {
    throw new UnauthorizedError();
  }

  next();
};
