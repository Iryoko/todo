import { RequestHandler } from "express";
import * as service from "./service";
import { asyncHandler } from "../../utilities/asyncHandler";
import { UserWithoutPassword } from "./data";
import { GeneralError, UnauthorizedError } from "../../utilities/errors";

declare module "express-session" {
  interface SessionData {
    user: UserWithoutPassword;
  }
}

export const signup: RequestHandler = asyncHandler(async (req, res) => {
  const user = await service.signup(req.body);

  // Create new session
  req.session.user = user;

  res.status(201).json({
    status: "success",
    data: user,
  });
});

export const login: RequestHandler = asyncHandler(async (req, res) => {
  const user = await service.login(req.body);

  // Create new session
  req.session.user = user;

  res.json({
    status: "success",
    data: user,
  });
});

export const logout: RequestHandler = asyncHandler((req, res) => {
  req.session.destroy((err) => {
    if (err) {
      throw new GeneralError(500, "Failed to logout");
    }

    res.clearCookie("connect.sid");

    res.json({
      status: "success",
      message: "Successfully logout",
    });
  });
});

export const me: RequestHandler = asyncHandler(async (req, res) => {
  if (req.session.user) {
    res.json({
      status: "success",
      data: req.session.user,
    });
  } else {
    throw new UnauthorizedError();
  }
});
