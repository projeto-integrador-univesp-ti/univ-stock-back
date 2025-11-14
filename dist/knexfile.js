"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const useSSL = process.env.DB_SSL === "true";
const sslConfig = useSSL
    ? {
        ca: (0, fs_1.readFileSync)((0, path_1.resolve)(process.env.DB_SSL_PATH || "")),
    }
    : undefined;
const common = {
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
const config = {
    dev: Object.assign({}, common),
    prd: Object.assign({}, common),
};
exports.config = config;
exports.default = config[process.env.ENVIRONMENT || "dev"];
