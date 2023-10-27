import { Router } from "express";
import { createRepair, deleteRepair, findAllRepairs, findOneRepair, updateRepair } from "./repairs.controller.js";
import { validateExistRepairs } from "./repairs.middlewares.js";

export const router = Router()

router.route('/')
.get(findAllRepairs)
.post(createRepair)

router.route('/:id')
.get(validateExistRepairs, findOneRepair)
.patch(validateExistRepairs, updateRepair)
.delete(validateExistRepairs, deleteRepair)

