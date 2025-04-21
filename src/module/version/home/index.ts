import { Request, Response } from "express";
import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { Module } from "./interfaces";
import { object } from "zod";

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
                observacoes: "string",
                id_produto: "number",
              },
            },
            response: {
              mensagem: 'string',
              data: {
                id: 'string',
                dt_fabricacao: "Date",
                dt_validade: "Date",
                observacoes: "string",
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
                observacoes: "string",
                id_produto: "number",
              }]
            },
          },
        ],
      },
      {
        module: "Measure",
        endpoinst: [
          {
            path: "/measure",
            method: "POST",
            description: "Adiciona uma medida.",
            request: {
              params: {},
              body: {
                nome: 'string',
                sigla: 'string',
              },
            },
            response: {
              mensagem: 'string',
              data: {
                id: 'string',
                nome: 'string',
                sigla: 'string',
              }
            },
          },
          {
            path: "/measure",
            method: "GET",
            description: "Recupera todas as medidas.",
            request: {
              params: {},
              body: {},
            },
            response: {
              data: [{
                id: 'string',
                nome: 'string',
                sigla: 'string',
              }]
            },
          },
        ],
      },
      {
        module: "Login",
        endpoinst: [
          {
            path: "/login",
            method: "POST",
            description: "Adiciona um login.",
            request: {
              params: {},
              body: {
                email: "string",
                dt_ultimo_acesso: "Date",
              },
            },
            response: {
              mensagem: 'string',
              data: {
                id_usuario: 'string',
                email: "string",
                dt_ultimo_acesso: "Date",
              }
            },
          },
          {
            path: "/login",
            method: "GET",
            description: "Recupera todos os logins.",
            request: {
              params: {},
              body: {},
            },
            response: {
              data: [{
                id_usuario: 'string',
                email: "string",
                dt_ultimo_acesso: "Date",
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
