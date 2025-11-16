import { Request, Response } from "express";
import { db } from "../../../database";
import { Product, Sale, GetSaleRequest, GetSaleResponse } from "./interfaces";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { SaleSchema } from "./schema";
import { Error } from "../../../typing";
import { formateISODate } from "../../../utils/date";

const toISODate = (date: string) => {
  if (date) {
    const [day, month, year] = date.split("/");
    return `${year}-${month}-${day}`;
  }
};

const getSale = async (
  req: Request<GetSaleRequest>,
  res: Response<GetSaleResponse | Error>
) => {
  const result = SaleSchema.safeParse(req.query);

  if (!result.success) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json(
        Status.error("SALE1001", "Parâmetro inválido", result.error.format())
      );
  }

  try {
    let query = db("vendas").select(
      "id",
      "valor_total",
      "valor_pago",
      "troco",
      "data_venda"
    );

    if (result.data?.id) {
      query = query.where("id", result.data?.id);
    } else if (result.data?.dataInicio && result.data?.dataFim) {
      query = query
        .whereRaw("DATE(data_venda) >= DATE(?)", [
          toISODate(result.data.dataInicio!),
        ])
        .whereRaw("DATE(data_venda) <= DATE(?)", [
          toISODate(result.data.dataFim!),
        ]);
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("SALE2002", "Parâmetros inválidos."));
    }

    const vendas = await query;

    if (!vendas || vendas.length === 0) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("SALE2003", "Nenhuma venda encontrada."));
    }

    const formatValues = (value: string, decimal: number) => {
      return Number(value).toFixed(decimal).replace(".", ",");
    };

    const response = await Promise.all(
      vendas.map(async (venda) => {
        const produtos = await db("produtosvendas as pv")
          .join("produtos as p", "pv.id_produto", "p.id")
          .join("medidas as m", "pv.id_medida", "m.id")
          .select("p.nome", "m.sigla", "pv.quantidade", "pv.preco_unidade")
          .where("pv.id_venda", venda.id);

        return {
          ...venda,
          troco: formatValues(venda.troco, 2),
          valor_total: formatValues(venda.valor_total, 2),
          valor_pago: formatValues(venda.valor_pago, 2),
          data_venda: formateISODate(venda.data_venda),
          produtos: produtos.map((product) => {
            return {
              ...product,
              preco_unidade: formatValues(product.preco_unidade, 2),
              quantidade: formatValues(product.quantidade, 3),
            };
          }),
        };
      })
    );

    res.status(StatusCodes.OK).json({ data: response });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("SALE2003", `Erro interno: ${err?.message}`));
  }
};

export { getSale };
