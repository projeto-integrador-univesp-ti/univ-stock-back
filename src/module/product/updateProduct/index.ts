import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { Product, UpdateProductRequest  } from "./interfaces";

const updateProduct = async (
  req: Request<{ id: string }, {}, UpdateProductRequest>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const produto = await db<Product>("produtos").where({ id }).first();

    if (!produto) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("PROD1008", "Produto não encontrado"));
    }

    await db<Product>("produtos").where({ id }).update(updates);

    const produtoAtualizado = await db<Product>("produtos").where({ id }).first();

    res.status(StatusCodes.OK).json({
      message: "Produto atualizado com sucesso",
      data: produtoAtualizado,
    });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_UPDATE", `Erro interno: ${err?.message}`));
  }
};

export { updateProduct };