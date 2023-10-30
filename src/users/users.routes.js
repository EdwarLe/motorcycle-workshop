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

router.post("/", protect, restricTo("employee", "owner"), createUser);

router.post("/login", login);

router
  .route("/:id")
  .get(validateExistUser, findOneUser)
  .patch(validateExistUser, protect, restricTo("owner"), updateUser)
  .delete(validateExistUser, protect, restricTo("owner"), deleteUser);
