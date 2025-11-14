"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.config = void 0;
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = require("./../../knexfile");
Object.defineProperty(exports, "config", { enumerable: true, get: function () { return knexfile_1.config; } });
const db = (0, knex_1.default)(knexfile_1.config[process.env.ENVIRONMENT || 'dev']);
exports.db = db;
