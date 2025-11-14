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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
var Actions;
(function (Actions) {
    Actions["CREATE"] = "Criar migra\u00E7\u00E3o";
    Actions["EXEC"] = "Executar migra\u00E7\u00F5es";
    Actions["ROLLBACK"] = "Desfazer migra\u00E7\u00E3o (Rollback)";
})(Actions || (Actions = {}));
function runMigration() {
    return __awaiter(this, void 0, void 0, function* () {
        const env = process.env["ENVIRONMENT"];
        try {
            const { action } = yield inquirer_1.default.prompt([
                {
                    type: "list",
                    name: "action",
                    message: "O que você deseja fazer?",
                    choices: [Actions.CREATE, Actions.EXEC, Actions.ROLLBACK],
                },
            ]);
            const { migrationName } = yield inquirer_1.default.prompt([
                {
                    type: "input",
                    name: "migrationName",
                    message: "Qual o nome da migração?",
                    when: action !== Actions.EXEC && action !== Actions.ROLLBACK,
                    validate: (input) => input ? true : "O nome da migração é obrigatório",
                },
            ]);
            if (action === Actions.CREATE) {
                console.log(`Criando a migração: ${migrationName}`);
                (0, child_process_1.execSync)(`npx knex migrate:make ${migrationName} -x ts --knexfile knexfile.ts --env ${env}`, { stdio: "inherit" });
                return;
            }
            if (action === Actions.EXEC) {
                console.log(`Executando migrações...`);
                (0, child_process_1.execSync)(`npx  knex migrate:latest --knexfile knexfile.js --env ${env}`, {
                    stdio: "inherit",
                });
                return;
            }
            if (action === Actions.ROLLBACK) {
                const { rollbackCount } = yield inquirer_1.default.prompt([
                    {
                        type: "number",
                        name: "rollbackCount",
                        message: "Quantas migrações você deseja desfazer?",
                        default: 1,
                    },
                ]);
                console.log(`Desfazendo ${rollbackCount} migrações...`);
                for (let i = 0; i < rollbackCount; i++) {
                    console.log(`Desfazendo a migração ${i + 1} de ${rollbackCount}`);
                    const message = (0, child_process_1.execSync)(`npx knex migrate:rollback --knexfile knexfile.ts --env ${env}`, { encoding: "utf-8" });
                    const finish = message.includes("Already at the base migration");
                    if (finish) {
                        if (i === 0) {
                            console.log("Não há nenhuma migração a ser desfeita!");
                        }
                        else {
                            console.log("Não há mais migrações a serem desfeitas!");
                        }
                        break;
                    }
                }
                return;
            }
        }
        catch (error) {
            console.error("Erro ao executar a migração:", error);
            process.exit(1);
        }
    });
}
runMigration();
