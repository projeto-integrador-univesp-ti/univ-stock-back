import type { Knex } from "knex";
import { readFileSync } from "fs";
import { resolve } from "path";
import { config as dotenv_config } from "dotenv";

dotenv_config();

const useSSL = process.env.DB_SSL === "true";
const sslConfig = useSSL
  ? {
      ca: readFileSync(resolve(process.env.DB_SSL_PATH || "")),
    }
  : undefined;

const common: Knex.Config = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    ssl: sslConfig,
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: "ts",
  },
};

const config: Record<string, Knex.Config> = {
  dev: { ...common },
  prd: { ...common },
};

export { config };
export default config[process.env.ENVIRONMENT || "dev"];
