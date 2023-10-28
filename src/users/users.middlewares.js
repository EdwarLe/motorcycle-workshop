import { UserService } from "./users.service.js";
import { promisify } from "util";
import jwt from "jsonwebtoken";
import { envs } from "../config/environments/environments.js";

const userService = new UserService();

export const validateExistUser = async (req, res, next) => {
  const { id } = req.params;

  const user = await userService.findOneUser(id);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "Register not found",
    });
  }

  req.user = user;
  next();
};

export const protect = async (req, res, next) => {
  let token;

  const auth = req.headers.authorization;

  if (auth && auth.startsWith("Bearer")) {
    token = auth.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "You are not log in!, Please log in to get access",
    });
  }

  const decode = await promisify(jwt.verify)(token, envs.SECRET_JWT_SEED);

  const user = await userService.findOneUser(decode.id);

  if (!user) {
    return res.status(401).json({
      status: "error",
      message: "the owner of this token is not longer availabe",
    });
  }

  if (user.changedPasswordAt) {
    const changedTimeStamp = parseInt(
      user.changedPasswordAt.getTime() / 1000,
      10
    );

    if (decode.iat < changedTimeStamp) {
      return res.status(401).json({
        status: "error",
        message: "User recently changed password!, please login again",
      });
    }
  }

  req.sessionUser = user;
  next();
};

export const restricTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      return res.status(403).json({
        status: "error",
        message: "You don´t have permission to perform this action",
      });
    }
    next();
  };
};

export const protectAccount = (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id === sessionUser.id) {
    return res.status(401).json({
      status: "error",
      message: "You don´t own this account",
    });
  }
  next();
};
