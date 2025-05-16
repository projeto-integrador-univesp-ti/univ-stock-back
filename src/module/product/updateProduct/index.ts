import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { db } from "../../../database";
import {
  Product,
  UpdateProductRequest,
  UpdateProductResponse,
} from "./interfaces";
import { Error } from "../../../typing";

const updateProduct = async (
  req: Request<UpdateProductRequest>,
  res: Response<UpdateProductResponse | Error>
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const produto = await db<Product>("produtos").where({ id }).first();

    if (!produto) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("PROD1008", "Produto não encontrado"));
    }

    await db<Product>("produtos").where({ id }).update(updates);

    const produtoAtualizado = await db<Product>("produtos")
      .where({ id })
      .first();

    if (produtoAtualizado) {
      res.status(StatusCodes.OK).json({
        data: produtoAtualizado,
      });
    } else {
      throw new Error("Produto não encontrado");
    }
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_UPDATE", `Erro interno: ${err?.message}`));
  }
};

export { updateProduct };
