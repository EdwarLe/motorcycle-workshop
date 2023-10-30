import { Router } from "express";
import { router as userRouter } from "./../users/users.routes.js";
import { router as repairRouter } from "./../repairs/repairs.routes.js";
import { protect } from "../users/users.middlewares.js";
export const router = Router();

router.use("/users", userRouter);
router.use(protect);
router.use("/repair", repairRouter);
