import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetProductResponse, GetProductRequest, Product } from "./interfaces";

const getProduct = async (
  req: Request<GetProductRequest>,
  res: Response<GetProductResponse | Error>
) => {
  try {
    const { id } = req.params;
    const produto = await db<Product>("produtos").where("id", id).first();
    if (!produto) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("PROD7001", "Produto não encontrado"));
      return;
    }
    res.json({ data: produto });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD7002", `Erro interno: ${err?.message}`));
  }
};

export { getProduct };
