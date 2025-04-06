import knex, { Knex } from "knex";
import { config } from "./../../knexfile";

const db: Knex<any, unknown[]> = knex(config[process.env.ENVIRONMENT || 'dev']);

export { config, db };
