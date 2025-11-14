import { Request, Response } from "express";
import { db } from "../../../database";
import { DecreaseProductRequest, DecreaseProductResponse } from "./interfaces";
import { error } from "../../../utils/status";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { DecreaseSchema } from "./schema";
import { Error } from "../../../typing";

const parseQty = (v: unknown): number => {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? "").trim());
  return Number.isFinite(n) ? n : NaN;
};

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

  const produtos = result.data!;
  const trx = await db.transaction();

  try {
    // 🔍 Normaliza os códigos (string sem espaços)
    const codigosProdutos = produtos.map((p: any) => String(p.codigo).trim());

    // 🧠 Busca produtos existentes
    const currentStocks = await trx("produtos")
      .whereIn("codigo", codigosProdutos)
      .select("codigo", "quantidade", "id");

    // 💡 Mapeia resultados encontrados
    const foundCodes = currentStocks.map((p) => String(p.codigo).trim());
    const notFound = codigosProdutos.filter((c) => !foundCodes.includes(c));

    if (notFound.length > 0) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          error(
            "PROD5002",
            `Alguns produtos não foram encontrados: ${notFound.join(", ")}`
          )
        );
    }

    // ⚙️ Atualiza quantidades
    const updates = [];
    for (const produtoDb of currentStocks) {
      const reqProduto = produtos.find(
        (p: any) => String(p.codigo).trim() === String(produtoDb.codigo).trim()
      );
      if (!reqProduto) continue;

      const dbQty = parseQty(produtoDb.quantidade);
      const reqQty = parseQty(reqProduto.quantidade);

      if (!Number.isFinite(dbQty) || !Number.isFinite(reqQty)) {
        await trx.rollback();
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            error("PROD5006", `Quantidade inválida para ${produtoDb.codigo}`)
          );
      }

      if (dbQty < reqQty) {
        await trx.rollback();
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            error(
              "PROD5003",
              `Estoque insuficiente para o produto ${produtoDb.codigo}.`
            )
          );
      }

      updates.push({
        codigo: produtoDb.codigo,
        quantidade: dbQty - reqQty,
      });
    }

    // 🔄 Executa updates no DB
    for (const u of updates) {
      await trx("produtos")
        .where({ codigo: u.codigo })
        .update({ quantidade: u.quantidade });
    }

    await trx.commit();
    res
      .status(StatusCodes.OK)
      .json({ data: { message: "Baixas aplicadas com sucesso." } });
  } catch (err: any) {
    await trx.rollback();
    console.error("Erro ao aplicar baixa:", err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("ERRO_UPDATE", `Erro interno: ${err?.message}`));
  }
};

export { decreaseProduct };
