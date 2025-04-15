import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetBatchesResponse, GetBatchesRequest, Batch } from "./interfaces";

const getBatches = async (
  _: Request<GetBatchesRequest>,
  res: Response<GetBatchesResponse | Error>
) => {
  try {
    const lotes = await db<Batch>("lotes").select("*");
    res.json({ data: lotes });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("LOTE2001", `Erro interno: ${err?.message}`));
  }
};

export { getBatches };
