import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "./../../../database";
import { GetUserResponse, GetUserResquest, User, Produto, AddProdutoRequest } from "./interfaces";
import { status } from "../../../utils/status";

const getUser = async (
  req: Request<GetUserResquest>,
  res: Response<GetUserResponse | Error>
) => {
  try {
    const { id } = req.body;

    if(!id) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("USER2001", "Id do usuário não informado."));
      return
    }

    const usuario = await db<User>("usuariosw").select("*").where("id", "=", id).first();

    if(usuario) {
      res.json({ data: usuario });
      return
    }

    res
      .status(StatusCodes.NOT_FOUND)
      .json(Status.error("USER2002", "Usuário não encontrado."));
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("USER2003", `Erro interno: ${err?.message}`));
  }
};

export { getUser };

const addProduto = async (
  req: Request<{}, {}, AddProdutoRequest>,
  res: Response
) => {
  try {
    const { id, nome, marca, quantidade, preco_unidade, perecivel, id_medida } = req.body;

    if (!id || id.length > 26) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1001", "ID inválido ou ausente (máximo 26 caracteres)"));
    }

    if (!nome || nome.length > 45) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1002", "Nome inválido ou ausente (máximo 45 caracteres)"));
    }

    if (!marca || marca.length > 45) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1003", "Marca inválida ou ausente (máximo 45 caracteres)"));
    }

    if (!quantidade || quantidade.toString().length > 45) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1004", "Quantidade inválida (até 45 dígitos)"));
    }

    if (!preco_unidade || preco_unidade > 99999) {
      return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1005", "Preço inválido (máximo 5 dígitos)"));
    }
    
    if (perecivel == undefined || typeof perecivel !== "number"){
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD1006", "Valor inserido errado (Apenas 1: sim ou 0: não"))
    }
        
    if (id_medida == undefined || typeof id_medida !== 'number'){
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json(Status.error("PROD1007", "Valor inválido (insira a unidade de medida correta)"))
      }

    const produto: Produto = {
      id,
      nome,
      marca,
      quantidade,
      preco_unidade,
      perecivel, 
      id_medida
    };

    await db<Produto>("produtos").insert(produto);

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Produto adicionado com sucesso", data: produto });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("Algo deu errado", `Erro interno: ${err?.message}`));
  }
};

export { addProduto };