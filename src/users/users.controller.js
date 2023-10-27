import { partialValidateUser, validateUser } from "./users.schema.js";
import { UserService } from "./users.service.js";

const userService = new UserService();

export const findAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers();

    return res.status(201).json(users);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const createUser = async (req, res) => {
  try {

    const {hasError, errorMessage, userData} = validateUser(req.body)

    if(hasError) {
      return res.status(421).json({
        status: 'error',
        message: errorMessage
      })
    }

    const users = await userService.createUser(userData);

    return res.status(201).json(users);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const {user} = req

    return res.status(201).json(user);
  } catch (error) {
    return res.status(201).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const {user} = req

    const {hasError, errorMessage, userData} = partialValidateUser(req.body)

    if(hasError) {
      return res.status(421).json({
        status: 'error',
        message: errorMessage
      })
    }
    const userUpdate = await userService.updateUser(user, userData.name, userData.email);

    return res.status(201).json(userUpdate);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const {user} = req

    await userService.deleteUser(user);

    return res.status(201).json(null);
  } catch (error) {
    return res.status(500).json(error)
  }
};
