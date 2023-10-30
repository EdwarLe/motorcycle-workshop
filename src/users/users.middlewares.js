import { UserService } from "./users.service.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { envs } from "../config/environments/environments.js";
import { AppError, catchAsync } from "../errors/index.js";

const userService = new UserService();

export const validateExistUser = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUser(id);

  if (!user) {
    return next(new AppError("Register not found", 401));
  }

  req.user = user;
  next();
});

export const protect = catchAsync(async (req, res, next) => {
  let token;

  const auth = req.headers.authorization;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in!, Please log in to get access", 401)
    );
  }

  const decode = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOneUser(decode.id);

  if (!user) {
    return next(
      new AppError("The owner of this token is not longer available", 401)
    );
  }

  if (user.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      user.changedPasswordAt.getTime() / 1000,
      10
    );

    if (decode.iat < changedTimeStamp) {
      return next(
        new AppError(
          "User recently changed password!, please login again.",
          401
        )
      );
    }
  }

  req.sessionUser = user;
  next();
});

export const restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return next(
        new AppError("You don´t have permission to perform this action", 403)
      );
    }
    next();
  };
};

export const protectAccount = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id === sessionUser.id) {
    return next(new AppError("You do not own this account", 401));
  }
  next();
};
