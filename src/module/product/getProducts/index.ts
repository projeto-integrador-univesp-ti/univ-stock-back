import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "./../../../database";

import { GetProductsResponse, GetProductsRequest, Product } from "./interfaces";

const getProducts = async (
  _: Request<GetProductsRequest>,
  res: Response<GetProductsResponse | Error>
) => {
  try {
    const produtos = await db<Product>("produtos").select("*");
    res.json({ data: produtos });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD2001", `Erro interno: ${err?.message}`));
  }
};

export { getProducts };
