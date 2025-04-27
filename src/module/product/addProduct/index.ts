import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddProductRequest, AddProductResponse, Product } from "./interfaces";
import { ulid } from "ulid";

const addProduct = async (
  req: Request<AddProductRequest>,
  res: Response<AddProductResponse>
) => {
  try {
    const { nome, marca, quantidade, preco_unidade, perecivel, id_medida } =
      req.body;

    if (!nome || nome.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "PROD1002",
            "Nome inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!marca || marca.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "PROD1003",
            "Marca inválida ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!quantidade || quantidade.toString().length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(Status.error("PROD1004", "Quantidade inválida (até 45 dígitos)"));
    }

    if (!preco_unidade || preco_unidade > 99999) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(Status.error("PROD1005", "Preço inválido (máximo 5 dígitos)"));
    }

    if (perecivel == undefined || typeof perecivel !== "boolean") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "PROD1006",
            "Valor inserido errado (Apenas 1: sim ou 0: não"
          )
        );
    }

    if (id_medida == undefined || typeof id_medida !== "number") {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "PROD1007",
            "Valor inválido (insira a unidade de medida correta)"
          )
        );
    }

    const produto: Product = {
      id: ulid(),
      nome,
      marca,
      quantidade,
      preco_unidade,
      perecivel,
      id_medida,
    };

    await db<Product>("produtos").insert(produto);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Produto adicionado com sucesso", data: produto });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addProduct };
