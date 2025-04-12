import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "./../../../database";

import { GetUserResponse, GetUserResquest, User } from "./interfaces";
import { GetUserSchema } from './schema';

const getUser = async (
  req: Request<GetUserResquest>,
  res: Response<GetUserResponse | Error>
) => {
  try {
    const result = GetUserSchema.safeParse(req.params);

    if (result.error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          Status.error("USER2001", `Parâmetro inválido.`, result.error.format())
        );
      return;
    }

    const usuario = await db<User>("usuarios").select("*").where("id", "=", result.data.id).first();

    if(usuario) {
      res.json({ data: usuario });
      return
    }

    res
      .status(StatusCodes.NOT_FOUND)
      .json(Status.error("USER2002", "Usuário não encontrado."));
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("USER2003", `Erro interno: ${err?.message}`));
  }
};

export { getUser };

