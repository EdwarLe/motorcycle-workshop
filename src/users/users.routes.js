import { Router } from "express";
import {
  createUser,
  deleteUser,
  findAllUsers,
  findOneUser,
  login,
  updateUser,
} from "./users.controller.js";
import { protect, restricTo, validateExistUser } from "./users.middlewares.js";

export const router = Router();

router.route("/").get(findAllUsers);

router.post("/register", protect, restricTo('employee'), createUser);

router.post("/login", login);

router
  .route("/:id")
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, updateUser)
  .delete(validateExistUser, deleteUser);
