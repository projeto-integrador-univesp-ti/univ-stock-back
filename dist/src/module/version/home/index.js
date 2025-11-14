"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.home = void 0;
const http_status_codes_1 = require("http-status-codes");
const home = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modules = [
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
                    {
                        path: "/product",
                        method: "PUT",
                        description: "Atualiza um produto.",
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
            {
                module: "Movement",
                endpoinst: [
                    {
                        path: "/movement",
                        method: "POST",
                        description: "Adiciona uma movimentação.",
                        request: {
                            params: {},
                            body: {
                                id_produto: "string",
                                id_usuario: "string",
                                email: "string",
                                movimento: "Enumerator",
                            },
                        },
                        response: {
                            mensagem: 'string',
                            data: {
                                id: "string",
                                id_produto: "string",
                                id_usuario: "string",
                                email: "string",
                                movimento: "Enumerator",
                            }
                        },
                    },
                    {
                        path: "/movement",
                        method: "GET",
                        description: "Recupera todos as movimentações.",
                        request: {
                            params: {},
                            body: {},
                        },
                        response: {
                            data: [{
                                    id: "string",
                                    id_produto: "string",
                                    id_usuario: "string",
                                    email: "string",
                                    movimento: "Enumerator",
                                }]
                        },
                    },
                ],
            },
            {
                module: "Contact",
                endpoinst: [
                    {
                        path: "/contact",
                        method: "POST",
                        description: "Adiciona um contato.",
                        request: {
                            params: {},
                            body: {
                                id_tipo_contato: "number",
                                nome: "string",
                            },
                        },
                        response: {
                            mensagem: 'string',
                            data: {
                                id: 'string',
                                id_tipo_contato: "number",
                                nome: "string",
                            }
                        },
                    },
                    {
                        path: "/contact",
                        method: "GET",
                        description: "Recupera todos os contatos.",
                        request: {
                            params: {},
                            body: {},
                        },
                        response: {
                            data: [{
                                    id: 'string',
                                    id_tipo_contato: "number",
                                    nome: "string",
                                }]
                        },
                    },
                ],
            },
            {
                module: "ContactType",
                endpoinst: [
                    {
                        path: "/contact type",
                        method: "POST",
                        description: "Adiciona um tipo de contato.",
                        request: {
                            params: {},
                            body: {
                                nome: "string",
                            },
                        },
                        response: {
                            mensagem: 'string',
                            data: {
                                id: 'string',
                                nome: "string",
                            }
                        },
                    },
                    {
                        path: "/contact type",
                        method: "GET",
                        description: "Recupera todos os tipos de contatos.",
                        request: {
                            params: {},
                            body: {},
                        },
                        response: {
                            data: [{
                                    id: 'string',
                                    nome: "number",
                                }]
                        },
                    },
                ],
            },
        ];
        res.render("index", { title: "Mini Stock", modules });
    }
    catch (error) {
        res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR,
            reason: (0, http_status_codes_1.getReasonPhrase)(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR),
        });
    }
});
exports.home = home;
