import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddLoginRequest, AddLoginResponse, Login } from "./interfaces";
import { ulid } from "ulid";

const addLogin = async (
  req: Request<AddLoginRequest>,
  res: Response<AddLoginResponse>
) => {
  try {
    const { email, dt_ultimo_acesso } =
      req.body;

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "LOG1001",
            "Email inválido ou ausente"
          )
        );
    }

    if (!dt_ultimo_acesso || isNaN(new Date(dt_ultimo_acesso).getTime())) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "LOG1002",
            "Data inválida ou ausente"
          )
        );
    }

    const login: Login = {
      id_usuario: ulid(),
      email,
      dt_ultimo_acesso,
    };

    await db<Login>("login").insert(login);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Login adicionado com sucesso", data: login });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addLogin };
