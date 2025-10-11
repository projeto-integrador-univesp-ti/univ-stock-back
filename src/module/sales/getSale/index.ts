import { Request, Response } from "express";
import { db } from "../../../database";
import { Product, Sale, GetSaleRequest, GetSaleResponse } from "./interfaces";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { SaleSchema } from "./schema";
import { Error } from "../../../typing";
import { formateISODate } from "../../../utils/date";

const getSale = async (
  req: Request<GetSaleRequest>,
  res: Response<GetSaleResponse | Error>
) => {
  const result = SaleSchema.safeParse(req.params);

  if (result.error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        Status.error("SALE1001", `Parâmetro inválido:`, result.error.format())
      );
  }

  try {
    const venda: Sale = await db("vendas")
      .select("valor_total", "valor_pago", "troco", "data_venda")
      .where("id", result.data?.id)
      .first();

    if (!venda) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("SALE2002", "Venda não encontrada."));
    }

    const produtos: Product[] = await db("produtosvendas as pv")
      .join("produtos as p", "pv.id_produto", "p.id")
      .join("medidas as m", "pv.id_medida", "m.id")
      .select("p.nome", "m.sigla", "pv.quantidade", "pv.preco_unidade")
      .where("pv.id_venda", result.data?.id);

    const formatValues = (value: string, decimal: number) => {
      return Number(value).toFixed(decimal).replace(".", ",");
    };

    res.status(StatusCodes.OK).json({
      data: {
        id: result.data!.id,
        troco: formatValues(venda.troco, 2),
        valor_total: formatValues(venda.valor_total, 2),
        valor_pago: formatValues(venda.valor_pago, 2),
        data_venda: formateISODate(venda.data_venda),
        produtos: produtos.map((product) => {
          return {
            ...product,
            quantidade: formatValues(product.quantidade, 3),
            preco_unidade: formatValues(product.preco_unidade, 2),
          };
        }),
      },
    });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("SALE2003", `Erro interno: ${err?.message}`));
  }
};

export { getSale };
