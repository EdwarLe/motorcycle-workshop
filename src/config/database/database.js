import { Sequelize } from "sequelize";
import { envs } from "../environments/environments.js";

const sequelize = new Sequelize(envs.URI_DB, {
  logging: false,
});

export async function authenticate() {
  try {
    await sequelize.authenticate();
    console.log("Connection has benn established successfully 💎");
  } catch (error) {
    throw new Error("Error al autenticar", error);
  }
}

export async function syncUp() {
  try {
    await sequelize.sync();
    console.log("Connection has been synced successfully 🎯");
  } catch (error) {
    throw new Error("Error al sincronizar", error);
  }
}

export default sequelize;
