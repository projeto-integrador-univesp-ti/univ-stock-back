import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const HomeController = {
  home: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.render("index", { title: "UnivStock" });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        reason: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      });
    }
  },
};

export { HomeController };
