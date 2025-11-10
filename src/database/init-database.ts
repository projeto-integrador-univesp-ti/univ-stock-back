import { db } from "./";

const createDatabase = async () => {
  // await db.raw("CREATE DATABASE IF NOT EXISTS `ndt6hcozk7ig1qfc`");
  await db.raw("USE `defaultdb`");
};

const createTables = async () => {
  if (!(await db.schema.hasTable("medidas"))) {
    await db.schema.createTable("medidas", (table) => {
      table.integer("id").primary();
      table.string("nome", 15);
      table.string("sigla", 10);
    });
  }

  if (!(await db.schema.hasTable("produtos"))) {
    await db.schema.createTable("produtos", (table) => {
      table.string("id", 26).primary();
      table.string("nome", 45).notNullable();
      table.decimal("quantidade", 10, 2);
      table.decimal("preco_unidade", 10, 2);
      table.string("codigo", 45).notNullable();
      table.string("codigo_barras", 15);
      table.string("marca", 45).nullable();
      table.boolean("perecivel");
      table.integer("id_medida").notNullable();
      table.foreign("id_medida").references("medidas.id");
    });
  }

  if (!(await db.schema.hasTable("lotes"))) {
    await db.schema.createTable("lotes", (table) => {
      table.string("id", 26).primary();
      table.string("id_produto", 26).notNullable();
      table.date("dt_fabricacao");
      table.date("dt_validade");
      table.string("observacoes", 255);
      table.foreign("id_produto").references("produtos.id");
    });
  }

  if (!(await db.schema.hasTable("fornecedores"))) {
    await db.schema.createTable("fornecedores", (table) => {
      table.string("id", 26).primary();
      table.string("cnpj", 14).nullable().unique();
      table.string("nome_razao_social", 80).nullable();
      table.string("nome_fantasia", 80).notNullable();
      table.string("cep_logradouro", 8).nullable();
      table.string("nome_logradouro", 80).nullable();
      table.string("numero_logradouro", 10).nullable();
      table.string("complemento_logadouro", 45).nullable();
      table.string("bairro_logradouro", 25).nullable();
      table.string("cidade_logradouro", 25).nullable();
      table.string("estado_logradouro", 25).nullable();
      table.string("observacoes", 255).nullable();
    });
  }

  if (!(await db.schema.hasTable("produtosfornecidos"))) {
    await db.schema.createTable("produtosfornecidos", (table) => {
      table.string("id_produto", 26).notNullable();
      table.string("id_fornecedor", 26).notNullable();
      table.primary(["id_produto", "id_fornecedor"]);
      table.foreign("id_produto").references("produtos.id");
      table.foreign("id_fornecedor").references("fornecedores.id");
    });
  }

  if (!(await db.schema.hasTable("tiposcontatos"))) {
    await db.schema.createTable("tiposcontatos", (table) => {
      table.integer("id").primary();
      table.string("nome", 10).notNullable().unique();
    });
  }

  if (!(await db.schema.hasTable("contatos"))) {
    await db.schema.createTable("contatos", (table) => {
      table.string("id", 26).primary();
      table.integer("id_tipo_contato").notNullable();
      table.string("nome", 45).nullable();
      table.foreign("id_tipo_contato").references("tiposcontatos.id");
    });
  }

  if (!(await db.schema.hasTable("contatosfornecedores"))) {
    await db.schema.createTable("contatosfornecedores", (table) => {
      table.string("id_fornecedor", 26).notNullable();
      table.string("id_contato", 26).notNullable();
      table.primary(["id_fornecedor", "id_contato"]);
      table.foreign("id_fornecedor").references("fornecedores.id");
      table.foreign("id_contato").references("contatos.id");
    });
  }

  if (!(await db.schema.hasTable("usuarios"))) {
    await db.schema.createTable("usuarios", (table) => {
      table.string("id", 26).primary();
      table.string("nome", 80).nullable();
      table.date("dt_nascimento").nullable();
    });
  }

  if (!(await db.schema.hasTable("autenticacao"))) {
    await db.schema.createTable("autenticacao", (table) => {
      table.string("email", 60).primary();
      table.string("senha", 60).notNullable();
      table.boolean("email_validado").defaultTo(0).notNullable();
    });
  }

  if (!(await db.schema.hasTable("login"))) {
    await db.schema.createTable("login", (table) => {
      table.string("id_usuario", 26).notNullable();
      table.string("email", 60).notNullable();
      table.timestamp("data_ultimo_acesso").defaultTo(db.fn.now());
      table.primary(["id_usuario", "email"]);
      table.foreign("email").references("autenticacao.email");
      table.foreign("id_usuario").references("usuarios.id");
    });
  }

  if (!(await db.schema.hasTable("contatosusuarios"))) {
    await db.schema.createTable("contatosusuarios", (table) => {
      table.string("id_usuario", 26).notNullable();
      table.string("id_contato", 26).notNullable();
      table.primary(["id_usuario", "id_contato"]);
      table.foreign("id_usuario").references("usuarios.id");
      table.foreign("id_contato").references("contatos.id");
    });
  }

  if (!(await db.schema.hasTable("movimentacoes"))) {
    await db.schema.createTable("movimentacoes", (table) => {
      table.string("id_produto", 26).notNullable();
      table.string("id_usuario", 26).notNullable();
      table.string("email", 60).notNullable();
      table.enu("movimento", ["entrada", "saida"]).notNullable();
      table.primary(["id_produto", "id_usuario", "email"]);
      table.foreign("id_produto").references("produtos.id");
      table
        .foreign(["id_usuario", "email"])
        .references(["login.id_usuario", "login.email"]);
    });
  }

  if (!(await db.schema.hasTable("vendas"))) {
    await db.schema.createTable("vendas", (table) => {
      table.string("id", 45).primary();
      table.decimal("valor_total", 10, 2).notNullable();
      table.decimal("valor_pago", 10, 2).notNullable();
      table.decimal("troco", 10, 2).notNullable();
      table.timestamp("data_venda").defaultTo(db.fn.now()).notNullable();
    });
  }

  if (!(await db.schema.hasTable("produtosvendas"))) {
    await db.schema.createTable("produtosvendas", (table) => {
      table.string("id_venda", 45).notNullable();
      table.string("id_produto", 26).notNullable();
      table.integer("id_medida").notNullable();
      table.integer("quantidade").unsigned().notNullable();
      table.decimal("preco_unidade", 10, 2).notNullable();
      table.primary(["id_venda", "id_produto"]);
      table.foreign("id_venda").references("id").inTable("vendas");
      table.foreign("id_produto").references("id").inTable("produtos");
      table.foreign("id_medida").references("id").inTable("medidas");
    });
  }
};

const insertDefaultData = async () => {
  await db("tiposcontatos")
    .insert([
      { id: 1, nome: "tel" },
      { id: 2, nome: "site" },
      { id: 3, nome: "email" },
      { id: 4, nome: "whatsapp" },
      { id: 5, nome: "tel_whats" },
    ])
    .onConflict(["id", "nome"])
    .ignore();

  await db("medidas")
    .insert([
      { id: 1, nome: "Grama", sigla: "g" },
      { id: 2, nome: "Quilograma", sigla: "kg" },
      { id: 3, nome: "Mililitro", sigla: "ml" },
      { id: 4, nome: "Litro", sigla: "l" },
      { id: 5, nome: "Unidade", sigla: "un" },
      { id: 6, nome: "Caixa", sigla: "cx" },
      { id: 7, nome: "Pacote", sigla: "pc" },
      { id: 8, nome: "Saco", sigla: "saco" },
      { id: 9, nome: "Lata", sigla: "lata" },
      { id: 10, nome: "Cacho", sigla: "cacho" },
      { id: 11, nome: "Cartão", sigla: "cart" },
      { id: 12, nome: "Caixote", sigla: "cxote" },
    ])
    .onConflict(["id", "nome"])
    .ignore();
};

const run = async () => {
  try {
    await createDatabase();
    await createTables();
    await insertDefaultData();
    console.log("Sucesso ao executar banco de dados!");
  } catch (err) {
    console.error("Erro ao executar banco de dados:", err);
  } finally {
    db.destroy();
  }
};

run();

export { db };
