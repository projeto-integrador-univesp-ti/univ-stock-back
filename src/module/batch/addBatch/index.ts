import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddBatchRequest, AddBatchResponse, Batch } from "./interfaces";
import { ulid } from "ulid";

const addBatch = async (
  req: Request<AddBatchRequest>,
  res: Response<AddBatchResponse>
) => {
  try {
    const { dt_fabricacao, dt_validade, observacoes, id_produto } =
      req.body;

    if (!dt_fabricacao || isNaN(new Date(dt_fabricacao).getTime())) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "LOTE1001",
            "Data inválida ou ausente"
          )
        );
    }

    if (!dt_validade || isNaN(new Date(dt_validade).getTime())) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "LOTE1002",
            "Data inválida ou ausente"
          )
        );
    }
    
    if (id_produto == undefined || typeof id_produto !== "number") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "LOTE1007",
            "Valor inválido (insira o id do produto correto)"
          )
        );
    }
  
    const lote: Batch = {
      id: ulid(),
      dt_fabricacao,
      dt_validade,
      observacoes,
      id_produto,
    };

    await db<Batch>("lotes").insert(lote);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Lote adicionado com sucesso", data: lote });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addBatch };
