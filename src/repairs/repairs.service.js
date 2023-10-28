import Repair from "./repairs.model.js";

export class RepairService {
  async findAllRepairs() {
    return await Repair.findAll({
      where: {
        status: "pending",
      },
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async findOneRepair(id) {
    return await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
  }

  async updateRepair(repair) {
    return await repair.update({ status: "completed" });
  }

  async deleteRepair(repair) {
    return await repair.update({ status: "cancelled" });
  }
}
