import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddContactRequest, AddContactResponse, Contact } from "./interfaces";
import { ulid } from "ulid";

const addContact = async (
  req: Request<AddContactRequest>,
  res: Response<AddContactResponse>
) => {
  try {
    const { id_tipo_contato, nome } =
      req.body;

      if (!nome || nome.length > 45) {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            Status.error(
              "CONT1001",
              "Nome inválido ou ausente (máximo 45 caracteres)"
            )
          );
      }

      if (id_tipo_contato == undefined || typeof id_tipo_contato !== "number") {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            Status.error(
              "CONT1002",
              "Valor inválido (insira o id do tipo de contato correto)"
            )
          );
      }

    const contato: Contact = {
      id: ulid(),
      nome: "string",
      id_tipo_contato: "string",              
    };

    await db<Contact>("contatos").insert(contato);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Contato adicionado com sucesso", data: contato });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addContact };
