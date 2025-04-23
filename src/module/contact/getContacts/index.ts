import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetContactsResponse, GetContactsRequest, Contact } from "./interfaces";

const getContacts = async (
  _: Request<GetContactsRequest>,
  res: Response<GetContactsResponse | Error>
) => {
  try {
    const contatos = await db<Contact>("contatos").select("*");
    res.json({ data: contatos });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("CONT2001", `Erro interno: ${err?.message}`));
  }
};

export { getContacts };
