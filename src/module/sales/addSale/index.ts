import { Request, Response } from "express";
import { db } from "../../../database";
import { AddSaleRequest, AddSaleResponse } from "./interfaces";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { SaleSchema } from "./schema";
import { Error } from "../../../typing";
import { generateOrderedUniqueNumericHash } from "../../../utils/generateOrderedUniqueNumericHash";

const addSale = async (
  req: Request<AddSaleRequest>,
  res: Response<AddSaleResponse | Error>
) => {
  const result = SaleSchema.safeParse(req.body);

  if (result.error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        Status.error("SALE1001", `Parâmetro inválido:`, result.error.format())
      );
  }

  const trx = await db.transaction();

  try {
    const saleId = generateOrderedUniqueNumericHash();

    await trx("Vendas").insert({
      id: saleId,
      valor_total: result.data?.valor_total,
      valor_pago: result.data?.valor_pago,
      troco: result.data?.troco,
      data_venda: db.fn.now(),
    });

    const produtosVenda = result.data?.produtos.map((produto) => ({
      id_venda: saleId,
      id_produto: produto.id_produto,
      id_medida: produto.id_medida,
      quantidade: produto.quantidade,
      preco_unidade: produto.preco_unidade,
    }));

    await trx("ProdutosVendas").insert(produtosVenda);
    await trx.commit();
    res
      .status(StatusCodes.OK)
      .json({ data: { message: "Venda registrada com sucesso." } });
  } catch (err: any) {
    await trx.rollback();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_UPDATE", `Erro interno: ${err?.message}`));
  }
};

export { addSale };
