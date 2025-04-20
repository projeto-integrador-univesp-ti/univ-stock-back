import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddMeasureRequest, AddMeasureResponse, Measure } from "./interfaces";
import { ulid } from "ulid";

const addMeasure = async (
  req: Request<AddMeasureRequest>,
  res: Response<AddMeasureResponse>
) => {
  try {
    const { nome, sigla } =
      req.body;

    if (!nome || nome.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "MED1002",
            "Nome inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!sigla || sigla.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "MED1003",
            "Sigla inválida ou ausente (máximo 45 caracteres)"
          )
        );
    }

    const medida: Measure = {
      id: ulid(),
      nome,
      sigla,
    };

    await db<Measure>("medidas").insert(medida);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Medida adicionada com sucesso", data: medida });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addMeasure };
