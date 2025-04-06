import { Request, Response, NextFunction } from "express";
import { StatusCodes, getReasonPhrase } from "http-status-codes";
import { recursiveObjectTo, snakeToCamelCase } from "../format";
import { BaseRoute, Error } from "../../typing";

const getResponse = (statusCode: typeof StatusCodes | number, data: any, error?: Error) => {
  if (error) {
    if (process.env.ENVIRONMENT !== "prd") {
      return {
        message: error.message,
        code: error.code,
        status: statusCode,
        reason: `${statusCode} - ${getReasonPhrase(statusCode as unknown as number)}`,
        error: true,
      };
    }

    return {
      message: error.code.split("AUTE")[1] === "AUTE" ? 'Autenticação inválida' : error.message,
      status: statusCode,
      error: true,
    };
  }

  return data;
};

const error = (code: string, message: string): Error => {
  return { code, message };
};

const status = (_: Request, res: Response, next: NextFunction) => {
  const json = res.json;
  (res as any).json = function (obj: any) {
    if ("/" + res.req.originalUrl.split("/")[1] === BaseRoute.authentication) {
      delete obj?.senha;
      delete obj?.dataValues?.senha;
    }

    if (obj?.dataValues) {
        obj.dataValues = recursiveObjectTo(obj.dataValues, snakeToCamelCase);
    }
    else {
        obj = recursiveObjectTo(obj, snakeToCamelCase);
    }
    
    const keysOfObj = Object.keys(obj);

    if (res.statusCode >= 400) {
      if (keysOfObj.length >= 2 && keysOfObj[0] === "code" && keysOfObj[1] === "message") {
        if (res.statusCode === 400) {
          const split = obj.message.split("of relation");
          obj.message = split.length == 2 ? split[0].replace("in column", "in the") + "parameter" : obj.message;
        }
        json.call(this, getResponse(res.statusCode, undefined, obj));
      } else {
        if (process.env.ENVIRONMENT !== "prd") {
          json.call(this, { error: "Erro não tratado!", route: res.req.originalUrl, obj });
        } else {
          json.call(this, { error: "Erro não tratado!", route: res.req.originalUrl });
        }
      }
    } else {
      json.call(this, getResponse(res.statusCode, obj));
    }
  };
  next();
};

export { status, error };
