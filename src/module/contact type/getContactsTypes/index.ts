import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetContactsTypesResponse, GetContactsTypesRequest, ContactType } from "./interfaces";

const getContactsTypes = async (
  _: Request<GetContactsTypesRequest>,
  res: Response<GetContactsTypesResponse | Error>
) => {
  try {
    const tipos_contatos = await db<ContactType>("tiposcontatos").select("*");
    res.json({ data: tipos_contatos });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("CONT2001", `Erro interno: ${err?.message}`));
  }
};

export { getContactsTypes };
