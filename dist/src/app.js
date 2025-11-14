"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const http_errors_1 = __importDefault(require("http-errors"));
const http_status_codes_1 = require("http-status-codes");
const path_1 = __importDefault(require("path"));
const routes_1 = require("./routes");
const format_1 = require("./utils/format");
const app = (0, express_1.default)();
// Configuração do motor de view (EJS)
app.set("views", path_1.default.join("src", "static", "views"));
app.set("view engine", "ejs");
// Middleware
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join("src", "static", "stylesheets")));
// Tratamento de retorno
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS, PATCH, DELETE, POST, PUT");
    res.setHeader("Access-Control-Allow-Headers", "X-Requested-With,content-type");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version");
    req.body = (0, format_1.recursiveObjectTo)(req.body, format_1.camelToSnakeCase);
    next();
});
// Rotas
app.use("/v1", routes_1.router);
// Captura de erro 404 e encaminhamento para o manipulador de erros
app.use((req, res, next) => {
    next((0, http_errors_1.default)(404));
});
// Manipulador de erros
app.use((err, req, res) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "dev" ? err : {};
    res.status(err.status || http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    res.render("error");
});
exports.default = app;
