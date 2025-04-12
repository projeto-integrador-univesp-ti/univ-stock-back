"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var commom = {
    client: "mysql2",
    connection: {
        user: "root",
        password: "123456",
        database: 'ministock'
    },
    pool: {
        min: 2,
        max: 10,
    },
    migrations: {
        extension: "ts",
    },
};
var config = {
    dev: __assign({}, commom),
    prd: __assign({}, commom),
};
exports.config = config;
exports.default = config[process.env["ENVIRONMENT"] || 'dev'];
