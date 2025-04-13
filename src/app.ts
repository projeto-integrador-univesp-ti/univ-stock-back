import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import path from "path";

import { router } from "./routes";
import { camelToSnakeCase, recursiveObjectTo } from "./utils/format";

const app = express();

// Configuração do motor de view (EJS)
app.set("views", path.join("src", "static", "views"));
app.set("view engine", "ejs");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("src", "static", "stylesheets")));

// Tratamento de retorno
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, OPTIONS, PATCH, DELETE, POST, PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  req.body = recursiveObjectTo(req.body, camelToSnakeCase);
  next();
});

// Rotas
app.use("/v1", router);

// Captura de erro 404 e encaminhamento para o manipulador de erros
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

// Manipulador de erros
app.use((err: HttpError, req: Request, res: Response) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "dev" ? err : {};
  res.status(err.status || StatusCodes.INTERNAL_SERVER_ERROR);
  res.render("error");
});

export default app;
