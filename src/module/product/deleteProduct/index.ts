import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { db } from "../../../database";
import { Status } from "../../../utils";

import {
  Product,
  DeleteProductRequest,
  DeleteProductResponse,
} from "./interfaces";
import { Error } from "../../../typing";

const deleteProduct = async (
  req: Request<DeleteProductRequest>,
  res: Response<DeleteProductResponse | Error>
) => {
  try {
    const { id } = req.params;

    const produto = await db<Product>("produtos").where({ id }).first();

    if (!produto) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("PROD1009", "Produto não encontrado"));
    }

    await db<Product>("produtos").where({ id }).delete();

    res.status(StatusCodes.OK).json({
      data: {
        message: "Produto removido com sucesso",
      },
    });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_DELETE", `Erro interno: ${err?.message}`));
  }
};

export { deleteProduct };
