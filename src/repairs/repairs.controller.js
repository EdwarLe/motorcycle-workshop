import { partialValidateRepair, validateRepair } from "./repairs.schema.js";
import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();
    return res.status(201).json(repairs);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const createRepair = async (req, res) => {
  try {
    const {hasError, errorMessage, repairData} = validateRepair(req.body)

    const repair = await repairService.createRepair(repairData);

    if(hasError) {
      return res.status(421).json( {
        status: 'error',
        message: errorMessage
      })
    }
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const {repair} = req
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const {repair} = req

    const {hasError, errorMessage, repairData} = partialValidateRepair(req.body)

    if(hasError) {
      return res.status(421).json({
        status: 'error',
        message: errorMessage
      })
    }
    const repairUpdated = await repairService.updateRepair(repair, repairData);

    return res.status(201).json(repairUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteRepair = async (req, res) => {
  try {
    const {repair} = req

    await repairService.deleteRepair(repair);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
