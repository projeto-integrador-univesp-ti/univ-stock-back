import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddSupplierRequest, AddSupplierResponse, Supplier } from "./interfaces";
import { ulid } from "ulid";

const addSupplier = async (
  req: Request<AddSupplierRequest>,
  res: Response<AddSupplierResponse>
) => {
  try {
    const { cnpj, nome_razao_social, nome_fantasia, cep_logradouro, nome_logradouro, numero_logradouro,
      complemento_logradouro, bairro_logradouro, cidade_logradouro, estado_logradouro, observacoes } =
      req.body;

    if (!cnpj || cnpj.toString().length !== 14) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error("FOR1001", "CNPJ inválido (deve conter 14 dígitos)"));
    }
    if (!nome_razao_social || nome_razao_social.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1002",
            "Nome inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!nome_fantasia || nome_fantasia.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1003",
            "Nome inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!cep_logradouro || cep_logradouro.toString().length !== 8) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error("FOR1004", "CEP inválido (deve conter 8 dígitos)"));
    }

    if (!nome_logradouro|| nome_logradouro.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1005",
            "Nome inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!numero_logradouro || numero_logradouro < 1 ) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error("FOR1006", "Numero inválido (deve conter pelo menos 1 dígitos)"));
    }
    
    if (!bairro_logradouro|| bairro_logradouro.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1007",
            "Bairro inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!cidade_logradouro|| cidade_logradouro.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1008",
            "Cidade inválida ou ausente (máximo 45 caracteres)"
          )
        );
    }

    if (!estado_logradouro|| estado_logradouro.length > 45) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(
          Status.error(
            "FOR1009",
            "Estado inválido ou ausente (máximo 45 caracteres)"
          )
        );
    }

    const fornecedor: Supplier = {
      id: ulid(),
      cnpj,
      nome_razao_social,
      nome_fantasia,
      cep_logradouro,
      nome_logradouro,
      numero_logradouro,
      complemento_logradouro,
      bairro_logradouro,
      cidade_logradouro,
      estado_logradouro,
      observacoes
    };

    await db<Supplier>("fornecedores").insert(fornecedor);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Fornecedor adicionado com sucesso", data: fornecedor });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addSupplier };
