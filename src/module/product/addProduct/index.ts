import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { Status } from "../../../utils";
import { db } from "../../../database";
import { AddProductRequest, AddProductResponse, Product } from "./interfaces";
import { ulid } from "ulid";
import { Batch } from "../../batch/addBatch/interfaces";

const addProduct = async (
  req: Request<AddProductRequest>,
  res: Response<AddProductResponse | Error>
) => {
  const trx = await db.transaction();

  try {
    const {
      codigo,
      id_medida,
      marca,
      nome,
      perecivel,
      preco_unidade,
      quantidade,
      quantidade_minima_estoque,
    } = req.body as unknown as AddProductRequest;

    if (!nome || nome.length > 45) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          Status.error(
            "PROD1001",
            "Nome inválido ou ausente (máx. 45 caracteres)"
          )
        );
    }

    if (!preco_unidade || preco_unidade > 99999) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("PROD1002", "Preço inválido (máx. 5 dígitos)"));
    }

    if (perecivel == undefined || typeof perecivel !== "boolean") {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("PROD1003", "Campo 'perecivel' deve ser booleano"));
    }

    if (id_medida == undefined || typeof id_medida !== "number") {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(Status.error("PROD1004", "Campo 'id_medida' inválido"));
    }

    if (quantidade_minima_estoque == null || isNaN(quantidade_minima_estoque)) {
      await trx.rollback();
      res
        .status(StatusCodes.BAD_REQUEST)
        .json(
          Status.error(
            "PROD1005",
            "Quantidade_miniquantidade_minima_estoque inválida"
          )
        );
    }

    const existingProduct = await trx("produtos").where({ codigo }).first();
    if (existingProduct) {
      await trx.rollback();
      res
        .status(StatusCodes.CONFLICT)
        .json(
          Status.error("PROD1006", `Código de produto já existente: ${codigo}`)
        );
    }

    const produtoId = ulid();
    const produto: Product = {
      id: produtoId,
      codigo,
      id_medida,
      marca,
      nome,
      perecivel,
      preco_unidade,
      quantidade,
      quantidade_minima_estoque,
    };

    await trx<Product>("produtos").insert(produto);
    await trx.commit();

    res.status(StatusCodes.CREATED).json({
      message: "Produto e lote adicionados com sucesso",
      data: { ...produto },
    });
  } catch (err: any) {
    await trx.rollback();
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("PROD5000", `Erro interno: ${err?.message}`));
  }
};

export { addProduct };
