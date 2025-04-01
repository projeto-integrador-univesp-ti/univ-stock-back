import { NextFunction, Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";

const UsersController = {
  getUsers: async (req: Request, res: Response, next: NextFunction) => {
    try {
      res.json({
        nome: 'Dannyel',
        idade: 28
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        reason: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
      });
    }
  },
};

export { UsersController };
