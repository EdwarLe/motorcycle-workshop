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
    const users = await userService.createUser(req.body);

    return res.status(201).json(users);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const findOneUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    return res.status(201).json(user);
  } catch (error) {
    return res.status(201).json(error);
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(500).json({
        status: "error",
        message: "User not found",
      });
    }

    const userUpdate = await userService.updateUser(user, req.body);

    return res.status(201).json(userUpdate);
  } catch (error) {
    return res.status(404).json(error);
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.findOneUser(id);

    if (!user) {
      return res.status(404).json({
        status: "error",
        message: "User not found",
      });
    }

    await userService.deleteUser(user);

    return res.status(201).json(null);
  } catch (error) {
    return res.status(500).json(error)
  }
};
