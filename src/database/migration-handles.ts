import { execSync } from "child_process";
import inquirer, { Answers } from "inquirer";

enum Actions {
  CREATE = "Criar migração",
  EXEC = "Executar migrações",
  ROLLBACK = "Desfazer migração (Rollback)",
}

async function runMigration() {
  const env = process.env["ENVIRONMENT"];

  try {
    const { action }: Answers = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message: "O que você deseja fazer?",
        choices: [Actions.CREATE, Actions.EXEC, Actions.ROLLBACK],
      },
    ]);

    const { migrationName }: Answers = await inquirer.prompt([
      {
        type: "input",
        name: "migrationName",
        message: "Qual o nome da migração?",
        when: action !== Actions.EXEC && action !== Actions.ROLLBACK,
        validate: (input: string) =>
          input ? true : "O nome da migração é obrigatório",
      },
    ]);

    if (action === Actions.CREATE) {
      console.log(`Criando a migração: ${migrationName}`);
      execSync(
        `npx knex migrate:make ${migrationName} -x ts --knexfile knexfile.ts --env ${env}`,
        { stdio: "inherit" }
      );
      return;
    }

    if (action === Actions.EXEC) {
      console.log(`Executando migrações...`);
      execSync(`npx  knex migrate:latest --knexfile knexfile.ts --env ${env}`, {
        stdio: "inherit",
      });
      return;
    }

    if (action === Actions.ROLLBACK) {
      const { rollbackCount }: Answers = await inquirer.prompt([
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
        const message = execSync(
          `npx knex migrate:rollback --knexfile knexfile.ts --env ${env}`,
          { encoding: "utf-8" }
        );

        const finish = message.includes("Already at the base migration");
        if (finish) {
          if (i === 0) {
            console.log("Não há nenhuma migração a ser desfeita!");
          } else {
            console.log("Não há mais migrações a serem desfeitas!");
          }
          break;
        }
      }
      return;
    }
  } catch (error) {
    console.error("Erro ao executar a migração:", error);
    process.exit(1);
  }
}

runMigration();
