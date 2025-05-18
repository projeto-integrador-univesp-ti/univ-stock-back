import { Request, Response, NextFunction } from "express";
import { db } from "../../../database";

const knex = db;

export const decreaseProduct = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
  const { amount } = req.body;
  const { id } = req.params; 

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Quantidade inválida." });
  }

  try {
    const product = await knex("products").where({ id }).first();

    if (!product) {
      return res.status(404).json({ error: "Produto não encontrado." });
    }

    if (product.quantity < amount) {
      return res.status(400).json({ error: "Estoque insuficiente." });
    }

    await knex("products")
      .where({ id })
      .update({ quantity: product.quantity - amount });

    return res.status(200).json({ message: "Baixa aplicada com sucesso." });
  } catch (error) {
    console.error("Erro ao dar baixa no produto:", error);
    return res.status(500).json({ error: "Erro interno ao dar baixa no produto." });
  }
}

