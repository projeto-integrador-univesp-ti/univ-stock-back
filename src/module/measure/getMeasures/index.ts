import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

import { Error } from "../../../typing";
import { Status } from "../../../utils";
import { db } from "../../../database";

import { GetMeasuresResponse, GetMeasuresRequest, Measure } from "./interfaces";

const getMeasures = async (
  _: Request<GetMeasuresRequest>,
  res: Response<GetMeasuresResponse | Error>
) => {
  try {
    const medidas = await db<Measure>("medidas").select("*");
    res.json({ data: medidas });
  } catch (err: any) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json(Status.error("MED2001", `Erro interno: ${err?.message}`));
  }
};

export { getMeasures };
