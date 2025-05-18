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
  const result = DecreaseSchema.safeParse(req.body.products);

  if (result.error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        Status.error("PROD5001", `Parâmetro inválido:`, result.error.format())
      );
  }

  const products = req.body.products;

  const trx = await db.transaction();

  try {
    const productIds = products.map((p: any) => p.id);
    const currentStocks = await trx("produtos")
      .whereIn("id", productIds)
      .select("id", "quantidade");

    const updatedStocks = currentStocks.reduce((acc, product) => {
      const requestProduct = products.find((p: any) => p.id === product.id);
      if (requestProduct && product.quantidade >= requestProduct.amount) {
        acc.push({
          id: product.id,
          newQuantity: product.quantidade - requestProduct.amount,
        });
      }
      acc;
    }, []);

    if (updatedStocks.length !== products.length) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(error("PROD5003", "Estoque insuficiente para algum produto."));
    }

    const updatePromises = updatedStocks.map((stock: any) =>
      trx("produtos")
        .where({ id: stock.id })
        .update({ quantidade: stock.newQuantity })
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
