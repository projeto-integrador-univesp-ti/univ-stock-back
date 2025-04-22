import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetMovementsResponse, GetMovementsRequest, Movement } from "./interfaces";

const getMovements = async (
  _: Request<GetMovementsRequest>,
  res: Response<GetMovementsResponse | Error>
) => {
  try {
    const movimentacoes = await db<Movement>("movimentacoes").select("*");
    res.json({ data: movimentacoes });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("MOV2001", `Erro interno: ${err?.message}`));
  }
};

export { getMovements };
