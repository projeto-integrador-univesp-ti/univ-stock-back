import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetSuppliersResponse, GetSuppliersRequest, Supplier } from "./interfaces";

const getSuppliers = async (
  _: Request<GetSuppliersRequest>,
  res: Response<GetSuppliersResponse | Error>
) => {
  try {
    const fornecedores = await db<Supplier>("fornecedores").select("*");
    res.json({ data: fornecedores });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("FOR2001", `Erro interno: ${err?.message}`));
  }
};

export { getSuppliers };
