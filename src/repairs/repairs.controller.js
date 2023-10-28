import { partialValidateRepair, validateRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";
import {catchAsync} from '../errors/index.js'


const repairService = new RepairService();

export const findAllRepairs = catchAsync(async (req, res) => {
    const repairs = await repairService.findAllRepairs();
    return res.status(201).json(repairs);
  
});

export const createRepair = catchAsync(async (req, res) => {
    const { hasError, errorMessage, repairData } = validateRepair(req.body);

    const repair = await repairService.createRepair(repairData);

    if (hasError) {
      return res.status(421).json({
        status: "error",
        message: errorMessage,
      });
    }
    return res.status(201).json(repair);
  
});

export const findOneRepair = catchAsync(async (req, res) => {

    const { repair } = req;
    return res.status(201).json(repair);
});

export const updateRepair = catchAsync(async (req, res) => {
    const { repair } = req;

    const { hasError, errorMessage, repairData } = partialValidateRepair(
      req.body
    );

    if (hasError) {
      return res.status(421).json({
        status: "error",
        message: errorMessage,
      });
    }
    const repairUpdated = await repairService.updateRepair(repair, repairData);

    return res.status(201).json(repairUpdated);

});

export const deleteRepair = catchAsync(async (req, res) => {

    const { repair } = req;

    await repairService.deleteRepair(repair);
    return res.status(204).json(null);
});
