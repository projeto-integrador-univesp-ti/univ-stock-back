import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import createError, { HttpError } from "http-errors";
import { StatusCodes } from "http-status-codes";
import logger from "morgan";
import path from "path";

import indexRouter from "./module/version/index.routes";
import usersRouter from "./module/users/index.routes";
import { BaseRoute } from "./typing";

const app = express();

// Configuração do motor de view (EJS)
app.set("views", path.join("src", "static", "views"));
app.set("view engine", "ejs");

// Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join("src", "static", "stylesheets")));

// Rotas
app.use(BaseRoute.version, indexRouter);
app.use(BaseRoute.user, usersRouter);

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
