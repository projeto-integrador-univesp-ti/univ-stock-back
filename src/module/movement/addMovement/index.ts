import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddMovementRequest, AddMovementResponse, Movement } from "./interfaces";
import { ulid } from "ulid";

const addMovement = async (
  req: Request<AddMovementRequest>,
  res: Response<AddMovementResponse>
) => {
  try {
    const { id_produto, id_usuario, email, movimento, quantidade } =
      req.body;    

    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "MOV1001",
            "Email inválido ou ausente"
          )
        );
    }

    const valoresValidosMovimento = ['entrada', 'saida'];


    if (!movimento || !valoresValidosMovimento.includes(movimento)) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(Status.error("MOV1002", "Entrada inválida (Apenas use Entrada ou Saída)"));
    }

    const movimentacao: Movement = {
      id: ulid(),
      id_produto,
      id_usuario,
      email,
      movimento,
      quantidade,
    };

    await db<Movement>("movimentacoes").insert(movimentacao);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Movimentação adicionada com sucesso", data: movimentacao });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addMovement };
