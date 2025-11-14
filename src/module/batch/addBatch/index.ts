import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddBatchRequest, AddBatchResponse, Batch } from "./interfaces";
import { ulid } from "ulid";

const addBatch = async (
  req: Request<AddBatchRequest>,
  res: Response<AddBatchResponse>
) => {
  try {
    const {
      dt_fabricacao,
      dt_validade,
      observacoes,
      id_produto,
      quantidade,
      codigo,
    } = req.body;

    if (!id_produto) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("LOTE1001", "ID do produto inválido ou ausente"));
    }

    const produto = await db("produtos").where({ id: id_produto }).first();

    if (!produto) {
      res
        .status(StatusCodes.NOT_FOUND)
        .json(Status.error("LOTE1002", "Produto não encontrado"));
    }

    if (quantidade == null || quantidade <= 0) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("LOTE1003", "Quantidade inválida ou ausente"));
    }


    const perecivel = !!produto.perecivel;

    if (perecivel) {
      if (!dt_validade) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .json(
            Status.error(
              "LOTE1004",
              "Data de validade obrigatória para produtos perecíveis"
            )
          );
      }
    }

    const lote: Batch = {
      id: ulid(),
      codigo,
      dt_fabricacao:
        perecivel && dt_fabricacao
          ? new Date(dt_fabricacao.split("/").reverse().join("-"))
          : null,
      dt_validade:
        perecivel && dt_validade
          ? new Date(dt_validade.split("/").reverse().join("-"))
          : null,
      observacoes,
      id_produto,
      quantidade,
    };

    await db.transaction(async (trx) => {
      await trx<Batch>("lotes").insert(lote);
      await trx("produtos")
        .where({ id: id_produto })
        .increment("quantidade", quantidade);
    });

    res.status(StatusCodes.CREATED).json({
      message: "Lote adicionado e quantidade do produto atualizada com sucesso",
      data: lote,
    });
  } catch (err: any) {
    console.error(err);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("LOTE5000", `Erro interno: ${err?.message}`));
  }
};

export { addBatch };
