import { Request, Response } from "express";
import { db } from "../../../database";
import { DecreaseProductRequest, DecreaseProductResponse } from "./interfaces";
import { error } from "../../../utils/status";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { DecreaseSchema } from "./schema";
import { Error } from "../../../typing";

const decreaseProduct = async (
  req: Request<DecreaseProductRequest>,
  res: Response<DecreaseProductResponse | Error>
) => {
  const result = DecreaseSchema.safeParse(req.body.produtos);
  if (result.error) {
    res
    .status(StatusCodes.BAD_REQUEST)
    .json(
      Status.error("PROD5001", `Parâmetro inválido:`, result.error.format())
    );
  }
  
  const produtos = req.body.produtos;
  
  const trx = await db.transaction();
  
  try {
    const codigosProdutos = produtos.map((p: any) => p.codigo);

    const currentStocks = await trx("produtos")
      .whereIn("codigo", codigosProdutos)
      .select("codigo", "quantidade");

    const updatedStocks = currentStocks.reduce((acc, produto) => {
      const requestProduct = produtos.find((p: any) => p.codigo === produto.codigo);      
      if (requestProduct && Number(produto.quantidade) >= requestProduct.quantidade) {
        acc.push({
          codigo: produto.codigo,
          quantidade: produto.quantidade - requestProduct.quantidade,
        });
      }
      return acc;
    }, []);
    

    if (updatedStocks.length !== produtos.length) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(error("PROD5003", "Estoque insuficiente para algum produto."));
    }

    const updatePromises = updatedStocks.map((stock: any) =>
      trx("produtos")
        .where({ codigo: stock.codigo })
        .update({ quantidade: stock.quantidade })
    );

    await Promise.all(updatePromises);
    await trx.commit();

    res
      .status(200)
      .json({ data: { message: "Baixas aplicadas com sucesso." } });
  } catch (err: any) {
    await trx.rollback();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_UPDATE", `Erro interno: ${err?.message}`));
  }
};

export { decreaseProduct };
