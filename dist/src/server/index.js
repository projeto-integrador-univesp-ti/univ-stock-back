#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Módulo de dependências
 */
const chalk_1 = __importDefault(require("chalk"));
const app_1 = __importDefault(require("../app"));
const http_1 = __importDefault(require("http"));
/**
 * Obter a porta do ambiente e armazená-la no Express
 */
const port = normalizePort(process.env.PORT || "3000");
app_1.default.set("port", port);
/**
 * Criar o servidor HTTP
 */
const server = http_1.default.createServer(app_1.default);
/**
 * Escutar na porta fornecida, em todas as interfaces de rede
 */
server.listen(port);
server.on("error", onError);
server.on("listening", onListening);
/**
 * Normaliza uma porta para número, string ou false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);
    if (isNaN(port)) {
        // Pipe nomeado
        return val;
    }
    if (port >= 0) {
        // Número da porta
        return port;
    }
    return false;
}
/**
 * Ouvinte de evento para o erro do servidor HTTP
 */
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "Pipe " + port : "Port " + port;
    // Lidar com erros específicos de escuta com mensagens amigáveis
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Ouvinte de evento para o servidor HTTP "listening"
 */
function onListening() {
    const message = chalk_1.default.white(`Servidor rodando em:`);
    const localhost = chalk_1.default.bgGreen.whiteBright.bold(` http://localhost:${port} `);
    console.log(`${message} ${localhost}`);
}
