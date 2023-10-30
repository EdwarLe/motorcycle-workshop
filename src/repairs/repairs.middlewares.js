import { RepairService } from "./repairs.service.js";
import { AppError, catchAsync } from "../errors/index.js";

const repairService = new RepairService();

export const validateExistRepairs = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const repair = await repairService.findOneRepair(id);

  if (!repair) {
    return next(new AppError("Register not found", 401));
  }

  req.repair = repair;
  next();
});
