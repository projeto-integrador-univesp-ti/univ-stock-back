import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetLoginsResponse, GetLoginsRequest, Login } from "./interfaces";

const getLogins = async (
  _: Request<GetLoginsRequest>,
  res: Response<GetLoginsResponse | Error>
) => {
  try {
    const logins = await db<Login>("login").select("*");
    res.json({ data: logins });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("LOG2001", `Erro interno: ${err?.message}`));
  }
};

export { getLogins };
