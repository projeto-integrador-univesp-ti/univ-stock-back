import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { db } from "../../../database";
import { Error } from "../../../typing";
import { Status } from "../../../utils";

import { ExistsResquest, ExistsResponse, Authentication } from "./interfaces";
import { CreateSchema } from "./schema";

const create = async (
  req: Request<ExistsResquest>,
  res: Response<ExistsResponse | Error>
) => {
  try {
    const result = await CreateSchema.safeParseAsync(req.body);

    if (result.error) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          Status.error("AUTH1001", `Parâmetro inválido:`, result.error.format())
        );
      return;
    }

    const auth = await db<Authentication>("autenticacao")
      .where("email", "=", result.data.email)
      .first();
    res.json({ data: { exists: Boolean(auth) } });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("AUTH1002", `Erro interno: ${err?.message}`));
  }
};

export { create };
