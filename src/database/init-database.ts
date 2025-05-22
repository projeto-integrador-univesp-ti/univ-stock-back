import { db } from "./";

const createDatabase = async () => {
  await db.raw("CREATE DATABASE IF NOT EXISTS `MiniStock`");
  await db.raw("USE `MiniStock`");
};

const createTables = async () => {
  if (!(await db.schema.hasTable("Medidas"))) {
    await db.schema.createTable("Medidas", (table) => {
      table.integer("id").primary();
      table.string("nome", 15).nullable();
      table.string("sigla", 10).nullable();
    });
  }

  if (!(await db.schema.hasTable("Produtos"))) {
    await db.schema.createTable("Produtos", (table) => {
      table.string("id", 26).primary();
      table.string("nome", 45).notNullable();
      table.string("marca", 45).notNullable();
      table.decimal("quantidade", 10, 2).nullable();
      table.decimal("preco_unidade", 10, 2).nullable();
      table.boolean("perecivel").nullable();
      table.integer("id_medida").notNullable();
      table.foreign("id_medida").references("Medidas.id");
    });
  }

  if (!(await db.schema.hasTable("Lotes"))) {
    await db.schema.createTable("Lotes", (table) => {
      table.string("id", 26).primary();
      table.string("id_produto", 26).notNullable();
      table.date("dt_fabricacao").nullable();
      table.date("dt_validade").nullable();
      table.string("observacoes", 255).nullable();
      table.foreign("id_produto").references("Produtos.id");
    });
  }

  if (!(await db.schema.hasTable("Fornecedores"))) {
    await db.schema.createTable("Fornecedores", (table) => {
      table.string("id", 26).primary();
      table.string("cnpj", 14).nullable();
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
      table.unique("cnpj");
    });
  }

  if (!(await db.schema.hasTable("ProdutosFornecidos"))) {
    await db.schema.createTable("ProdutosFornecidos", (table) => {
      table.string("id_produto", 26).notNullable();
      table.string("id_fornecedor", 26).notNullable();
      table.primary(["id_produto", "id_fornecedor"]);
      table.foreign("id_produto").references("Produtos.id");
      table.foreign("id_fornecedor").references("Fornecedores.id");
    });
  }

  if (!(await db.schema.hasTable("TiposContatos"))) {
    await db.schema.createTable("TiposContatos", (table) => {
      table.integer("id").primary();
      table.string("nome", 10).notNullable().unique();
    });
  }

  if (!(await db.schema.hasTable("Contatos"))) {
    await db.schema.createTable("Contatos", (table) => {
      table.string("id", 26).primary();
      table.integer("id_tipo_contato").notNullable();
      table.string("nome", 45).nullable();
      table.foreign("id_tipo_contato").references("TiposContatos.id");
    });
  }

  if (!(await db.schema.hasTable("ContatosFornecedores"))) {
    await db.schema.createTable("ContatosFornecedores", (table) => {
      table.string("id_fornecedor", 26).notNullable();
      table.string("id_contato", 26).notNullable();
      table.primary(["id_fornecedor", "id_contato"]);
      table.foreign("id_fornecedor").references("Fornecedores.id");
      table.foreign("id_contato").references("Contatos.id");
    });
  }

  if (!(await db.schema.hasTable("Usuarios"))) {
    await db.schema.createTable("Usuarios", (table) => {
      table.string("id", 26).primary();
      table.string("nome", 80).nullable();
      table.date("dt_nascimento").nullable();
    });
  }

  if (!(await db.schema.hasTable("Autenticacao"))) {
    await db.schema.createTable("Autenticacao", (table) => {
      table.string("email", 60).primary();
      table.string("senha", 60).notNullable();
      table.boolean("email_validado").defaultTo(0).notNullable();
    });
  }

  if (!(await db.schema.hasTable("Login"))) {
    await db.schema.createTable("Login", (table) => {
      table.string("id_usuario", 26).notNullable();
      table.string("email", 60).notNullable();
      table.timestamp("data_ultimo_acesso").defaultTo(db.fn.now());
      table.primary(["id_usuario", "email"]);
      table.foreign("email").references("Autenticacao.email");
      table.foreign("id_usuario").references("Usuarios.id");
    });
  }

  if (!(await db.schema.hasTable("ContatosUsuarios"))) {
    await db.schema.createTable("ContatosUsuarios", (table) => {
      table.string("id_usuario", 26).notNullable();
      table.string("id_contato", 26).notNullable();
      table.primary(["id_usuario", "id_contato"]);
      table.foreign("id_usuario").references("Usuarios.id");
      table.foreign("id_contato").references("Contatos.id");
    });
  }

  if (!(await db.schema.hasTable("Movimentacoes"))) {
    await db.schema.createTable("Movimentacoes", (table) => {
      table.string("id_produto", 26).notNullable();
      table.string("id_usuario", 26).notNullable();
      table.string("email", 60).notNullable();
      table.enu("movimento", ["entrada", "saida"]).notNullable();
      table.primary(["id_produto", "id_usuario", "email"]);
      table.foreign("id_produto").references("Produtos.id");
      table
        .foreign(["id_usuario", "email"])
        .references(["Login.id_usuario", "Login.email"]);
    });
  }
};

const insertDefaultData = async () => {
  await db("TiposContatos")
    .insert([
      { id: 1, nome: "tel" },
      { id: 2, nome: "site" },
      { id: 3, nome: "email" },
      { id: 4, nome: "whatsapp" },
      { id: 5, nome: "tel_whats" },
    ])
    .onConflict(["id", "nome"])
    .ignore();

  await db("Medidas")
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
  }
  finally{
    db.destroy()
  }
};

run();

export { db };
