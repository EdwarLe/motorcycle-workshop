import {
  encryptedPassword,
  verifyPassword,
} from "../config/plugins/encripted-password.js";
import generateJWT from "../config/plugins/generate-JWT.js";
import { AppError, catchAsync } from "../errors/index.js";
import {
  partialValidateUser,
  validateLogin,
  validateUser,
} from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = catchAsync(async (req, res) => {
    const users = await userService.findAllUsers();

    return res.status(201).json(users);

});

export const createUser = catchAsync(async (req, res, next) => {
    const { hasError, errorMessage, userData } = validateUser(req.body);

    if (hasError) {
      return res.status(421).json({
        status: "error",
        message: errorMessage,
      });
    }

    const user = await userService.createUser(userData);

    const token = await generateJWT(user.id);

    return res.status(201).json({
      token,
      user,
    });

});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessage, loginData } = validateLogin(req.body);

  if (hasError) {
    return res.status(422).json({
      status: "error",
      message: errorMessage,
    });
  }

  const user = await userService.findOneUserByEmail(loginData.email);

  if (!user) {
    return next(new AppError('This account does not exist', 401))
  }

  const isCorrectPassword = await verifyPassword(
    loginData.password,
    user.password
  );

  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401))
  }

  const token = await generateJWT(user.id);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});


export const findOneUser = catchAsync(async (req, res) => {
    const { user } = req;

    return res.status(201).json(user);

});

export const updateUser = catchAsync(async (req, res) => {
    const { user } = req;

    const { hasError, errorMessage, userData } = partialValidateUser(req.body);

    if (hasError) {
      return res.status(421).json({
        status: "error",
        message: errorMessage,
      });
    }
    const userUpdate = await userService.updateUser(
      user,
      userData.name,
      userData.email
    );

    return res.status(201).json(userUpdate);
});

export const deleteUser = catchAsync(async (req, res) => {
    const { user } = req;

    await userService.deleteUser(user);

    return res.status(201).json(null);
});
