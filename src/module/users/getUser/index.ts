import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "./../../../database";
import { GetUserResponse, GetUserResquest, User } from "./interfaces";

const getUser = async (
  req: Request<GetUserResquest>,
  res: Response<GetUserResponse | Error>
) => {
  try {
    const { id } = req.body;

    if(!id) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("USER2001", "Id do usuário não informado."));
      return
    }

    const usuario = await db<User>("usuariosw").select("*").where("id", "=", id).first();

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
