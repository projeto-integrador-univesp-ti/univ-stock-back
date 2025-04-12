import type { Knex } from "knex";

const commom = {
  client: "mysql2",
  connection: {
    user: "root",
    password: "123456"
  },
  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    extension: "ts",
  },
};

const config: { [key: string]: Knex.Config } = {
  dev: { ...commom },
  prd: { ...commom },
};

export { config };
export default config[process.env["ENVIRONMENT"] || 'dev'];
