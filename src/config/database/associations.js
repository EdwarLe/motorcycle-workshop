import User from "../../users/users.model.js";
import Repair from "../../repairs/repairs.model.js";

export const initModel = () => {
  User.hasMany(Repair, { foreignKey: "user_id", as: "userHasRepair" });
  Repair.belongsTo(User, { foreignKey: "user_id", as: "repairFromUser" });
};
