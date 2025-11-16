import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { db } from "../../../database";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import {
  ExpiringBatchItem,
  GetExpiringBatchesRequest,
  GetExpiringBatchesResponse,
  MinItem,
} from "./interfaces";

const getExpiringBatches = async (
  _: Request<GetExpiringBatchesRequest>,
  res: Response<GetExpiringBatchesResponse | Error>
) => {
  try {
    const today = new Date();
    const oneWeekLater = new Date();
    oneWeekLater.setDate(today.getDate() + 7);

    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    const lotes = await db("lotes")
      .select(
        "lotes.codigo as lote_codigo",
        "lotes.dt_validade",
        "lotes.quantidade",
        "produtos.nome as produto_nome",
        "medidas.sigla as medida_sigla"
      )
      .leftJoin("produtos", "produtos.id", "lotes.id_produto")
      .leftJoin("medidas", "medidas.id", "produtos.id_medida")
      .whereNotNull("lotes.dt_validade");

    const semana: ExpiringBatchItem[] = [];
    const mes: ExpiringBatchItem[] = [];

    lotes.forEach((l) => {
      const validade = new Date(l.dt_validade);

      const itemFormatado: ExpiringBatchItem = {
        nome: l.produto_nome,
        lote: l.lote_codigo,
        data: format(validade, "dd/MM/yyyy", { locale: ptBR }),
        quantidade: `${Number(l.quantidade).toFixed(2)} ${l.medida_sigla}`,
      };

      if (validade >= today && validade <= oneWeekLater) {
        semana.push(itemFormatado);
      }

      if (validade > oneWeekLater && validade <= endOfMonth) {
        mes.push(itemFormatado);
      }
    });
 
    const estoqueBaixo = await db("produtos")
      .select(
        "produtos.nome",
        "produtos.quantidade",
        "produtos.quantidade_minima_estoque",
        "medidas.sigla as medida_sigla"
      )
      .leftJoin("medidas", "medidas.id", "produtos.id_medida")
      .whereRaw("produtos.quantidade <= produtos.quantidade_minima_estoque");

    const estoqueBaixoFormatado: MinItem[] = estoqueBaixo.map((p) => ({
      nome: p.nome,
      quantidade: `${Number(p.quantidade).toFixed(2)} ${p.medida_sigla}`,
      minimo: `${Number(p.quantidade_minima_estoque).toFixed(2)} ${
        p.medida_sigla
      }`,
    }));

    res.json({ semana, mes, estoqueBaixo: estoqueBaixoFormatado });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("LOTE3001", `Erro interno: ${err?.message}`));
  }
};

export { getExpiringBatches };
