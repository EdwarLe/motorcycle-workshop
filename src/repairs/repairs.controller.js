import { RepairService } from "./repairs.service.js";

const repairService = new RepairService();

export const findAllRepairs = async (req, res) => {
  try {
    const repairs = await repairService.findAllRepairs();
    return res.status(201).json(repairs);
  } catch (error) {
    return res.status(500).json(error)
  }
};

export const createRepair = async (req, res) => {
  try {
    const repair = await repairService.createRepair(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await repairService.findOneRepair(id);

  return res.status(201).json(repair);
};

export const updateRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await repairService.findOneRepair(id);

  const repairUpdated = await repairService.updateRepair(repair, req.body);

  return res.status(201).json(repairUpdated);
};

export const deleteRepair = async (req, res) => {
  const { id } = req.params;
  const repair = await repairService.findOneRepair(id);

  await repairService.deleteRepair(repair);
};
