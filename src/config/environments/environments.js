import "dotenv/config";
import env from "env-var";

export const envs = {
  PORT: env.get("PORT").required().asPortNumber(),
  URI_DB: env.get("URI_DB").required().asString(),
  SECRET_JWT_SEED: env.get("SECRET_JWT_SEED").required().asString(),
  JWT_EXPIRE_IN: env.get("JWT_EXPIRE_IN").required().asString(),
  NODE_ENV: env.get("NODE_ENV").required().asString(),
};
