import type { Knex } from "knex";

const commom = {
  client: "mysql2",
  connection: {
    host: 'lgg2gx1ha7yp2w0k.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: "sx39u4vehwhtap8a",
    password: "b1k30xiuuv172gqf",
    database: 'ndt6hcozk7ig1qfc',
    port: 3306
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
