import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ulid } from "ulid";

import { db } from "../../../database";
import { Error } from "../../../typing";
import { Status } from "../../../utils";

import { AddUserResponse, AddUserResquest, User } from "./interfaces";
import { AddUserSchema } from "./schema";

const addUser = async (
  req: Request<AddUserResquest>,
  res: Response<AddUserResponse | Error>
) => {
  try {
    const result = AddUserSchema.safeParse(req.body);

    if (result.error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          Status.error("USER3001", `Parâmetro inválido:`, result.error.format())
        );
      return;
    }

    const newUser: User = {
      id: ulid(),
      nome: result.data.nome,
      dt_nascimento: result.data.dt_nascimento,
    };

    await db<User>("usuarios").insert(newUser);
    res.json({ data: newUser });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("USER3002", `Erro interno: ${err?.message}`));
  }
};

export { addUser };

