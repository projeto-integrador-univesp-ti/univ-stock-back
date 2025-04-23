import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddContactTypeRequest, AddContactTypeResponse, ContactType } from "./interfaces";
import { ulid } from "ulid";

const addContactType = async (
  req: Request<AddContactTypeRequest>,
  res: Response<AddContactTypeResponse>
) => {
  try {
    const { nome } =
      req.body;

      if (!nome || nome.length > 45) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            Status.error(
              "CONT1002",
              "Nome inválido ou ausente (máximo 45 caracteres)"
            )
          );
      }

    const tipo_contato: ContactType = {
      id: ulid(),
      nome,         
    };

    await db<ContactType>("tiposcontatos").insert(tipo_contato);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Tipo de contato adicionado com sucesso", data: tipo_contato });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addContactType };
