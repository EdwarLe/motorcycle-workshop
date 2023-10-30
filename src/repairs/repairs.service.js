import { Op } from "sequelize";
import Repair from "./repairs.model.js";
import User from "../users/users.model.js";

export class RepairService {
  async findAllRepairs(status) {
    let whereClause = {
      status,
    };

    if (!status) {
      whereClause.status = {
        [Op.in]: ["pending", "completed"],
      };
    }

    return await Repair.findAll({
      where: whereClause,
      include: [
        {
          model: User,
          as: "repairFromUser",
          attributes: ["name", "user_id", "email"],
        },
      ],
    });
  }

  async createRepair(data) {
    return await Repair.create(data);
  }

  async findOneRepair(id, status) {
    let whereClause = {
      id,
      status,
    };

    if (!status) {
      whereClause.status = {
        [Op.in]: ["pending", "completed"],
      };
    }

    return await Repair.findOne({
      where: whereClause,
      include: [
        {
          model: User,
          as: "repairFromUser",
          attributes: ["name", "user_id", "email"],
        },
      ],
    });
  }

  async updateRepair(repair, data) {
    return await repair.update({
      ...data,
      status: "completed",
    });
  }

  async deleteRepair(repair) {
    return await repair.update({ status: "cancelled" });
  }
}
