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
    const repair = await repairService.createRepair(req.body);
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const findOneRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);
    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: "Register not found",
      });
    }
    return res.status(201).json(repair);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);

    if (!repair) {
      return res.status(404).json({
        status: "error",
        message: "Register not found",
      });
    }
    const repairUpdated = await repairService.updateRepair(repair, req.body);

    return res.status(201).json(repairUpdated);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await repairService.findOneRepair(id);

    await repairService.deleteRepair(repair);
    return res.status(204).json(null);
  } catch (error) {
    return res.status(500).json(error);
  }
};
