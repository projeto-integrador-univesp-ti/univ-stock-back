import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Module } from "./interfaces";

const home = async (_: Request, res: Response) => {
  try {
    const modules: Module[] = [
      {
        module: "Auth",
        endpoinst: [
          {
            path: "/exists",
            method: "POST",
            description: "Verifica se um e-mail já está cadastrado.",
            request: {
              params: {},
              body: { email: "string" },
            },
            response: {
              data: { exists: "boolean" },
            },
          },
        ],
      },
      {
        module: "User",
        endpoinst: [
          {
            path: "/user",
            method: "GET",
            description: "Recupera todos os usuários.",
            request: {
              params: {},
              body: {},
            },
            response: {
              data: [{ id: "string", nome: "string", dtNascimento: "date" }],
            },
          },
          {
            path: "/user/:id",
            method: "GET",
            description: "Recupera um usuário específico.",
            request: {
              params: { id: "string" },
              body: {},
            },
            response: {
              data: {
                id: "string",
                nome: "string",
                dtNascimento: "date",
              },
            },
          },
          {
            path: "/user",
            method: "POST",
            description: "Adiciona um usuário.",
            request: {
              params: {},
              body: {
                nome: "string",
                dtNascimento: "date",
              },
            },
            response: {
              data: {
                id: "string",
                nome: "string",
                dtNascimento: "date",
              },
            },
          },
        ],
      },
      {
        module: "Product",
        endpoinst: [
          {
            path: "/product",
            method: "POST",
            description: "Adiciona um produto.",
            request: {
              params: {},
              body: {
                nome: 'string',
                marca: 'string',
                quantidade: 'string',
                precoUnidade: 'number',
                perecivel: 'number',
                idMedida: 'number',
              },
            },
            response: {
              mensagem: 'string',
              data: {
                id: 'string',
                nome: 'string',
                marca: 'string',
                quantidade: 'string',
                precoUnidade: 'number',
                perecivel: 'number',
                idMedida: 'number',
              }
            },
          },
          {
            path: "/product",
            method: "GET",
            description: "Recupera todos os produtos.",
            request: {
              params: {},
              body: {},
            },
            response: {
              data: [{
                id: 'string',
                nome: 'string',
                marca: 'string',
                quantidade: 'string',
                precoUnidade: 'number',
                perecivel: 'number',
                idMedida: 'number',
              }]
            },
          },
        ],
      },
      {
        module: "Batch",
        endpoinst: [
          {
            path: "/batch",
            method: "POST",
            description: "Adiciona um lote.",
            request: {
              params: {},
              body: {
                dt_fabricacao: "Date",
                dt_validade: "Date",
                id_produto: "number",
              },
            },
            response: {
              mensagem: 'string',
              data: {
                id: 'string',
                dt_fabricacao: "Date",
                dt_validade: "Date",
                id_produto: "number",
              }
            },
          },
          {
            path: "/batch",
            method: "GET",
            description: "Recupera todos os lotes.",
            request: {
              params: {},
              body: {},
            },
            response: {
              data: [{
                id: 'string',
                dt_fabricacao: "Date",
                dt_validade: "Date",
                id_produto: "number",
              }]
            },
          },
        ],
      },
    ];
    res.render("index", { title: "Mini Stock", modules });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      status: StatusCodes.INTERNAL_SERVER_ERROR,
      reason: getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR),
    });
  }
};

export { home };
