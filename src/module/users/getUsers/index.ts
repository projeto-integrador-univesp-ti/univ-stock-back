import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "./../../../database";
import { GetUsersResponse, GetUsersResquest, User } from "./interfaces";

const getUsers = async (
  _: Request<GetUsersResquest>,
  res: Response<GetUsersResponse | Error>
) => {
  try {
    const usuarios = await db<User>("usuarios").select("*");
    res.json({ data: usuarios });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("USER1001", `Erro interno: ${err?.message}`));
  }
};

export { getUsers };

