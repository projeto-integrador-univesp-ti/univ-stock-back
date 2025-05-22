-- Criação do banco de dados
CREATE DATABASE IF NOT EXISTS `MiniStock`;
USE `MiniStock`;

-- Tabela: Medidas
CREATE TABLE IF NOT EXISTS Medidas (
  id INT PRIMARY KEY,
  nome VARCHAR(15),
  sigla VARCHAR(10)
);

-- Tabela: Produtos
CREATE TABLE IF NOT EXISTS Produtos (
  id VARCHAR(26) PRIMARY KEY,
  nome VARCHAR(45) NOT NULL,
  marca VARCHAR(45) NOT NULL,
  quantidade DECIMAL(10,2),
  preco_unidade DECIMAL(10,2),
  perecivel BOOLEAN,
  id_medida INT NOT NULL,
  FOREIGN KEY (id_medida) REFERENCES Medidas(id)
);

-- Tabela: Lotes
CREATE TABLE IF NOT EXISTS Lotes (
  id VARCHAR(26) PRIMARY KEY,
  id_produto VARCHAR(26) NOT NULL,
  dt_fabricacao DATE,
  dt_validade DATE,
  observacoes VARCHAR(255),
  FOREIGN KEY (id_produto) REFERENCES Produtos(id)
);

-- Tabela: Fornecedores
CREATE TABLE IF NOT EXISTS Fornecedores (
  id VARCHAR(26) PRIMARY KEY,
  cnpj VARCHAR(14) UNIQUE,
  nome_razao_social VARCHAR(80),
  nome_fantasia VARCHAR(80) NOT NULL,
  cep_logradouro VARCHAR(8),
  nome_logradouro VARCHAR(80),
  numero_logradouro VARCHAR(10),
  complemento_logadouro VARCHAR(45),
  bairro_logradouro VARCHAR(25),
  cidade_logradouro VARCHAR(25),
  estado_logradouro VARCHAR(25),
  observacoes VARCHAR(255)
);

-- Tabela: ProdutosFornecidos
CREATE TABLE IF NOT EXISTS ProdutosFornecidos (
  id_produto VARCHAR(26) NOT NULL,
  id_fornecedor VARCHAR(26) NOT NULL,
  PRIMARY KEY (id_produto, id_fornecedor),
  FOREIGN KEY (id_produto) REFERENCES Produtos(id),
  FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id)
);

-- Tabela: TiposContatos
CREATE TABLE IF NOT EXISTS TiposContatos (
  id INT PRIMARY KEY,
  nome VARCHAR(10) NOT NULL UNIQUE
);

-- Tabela: Contatos
CREATE TABLE IF NOT EXISTS Contatos (
  id VARCHAR(26) PRIMARY KEY,
  id_tipo_contato INT NOT NULL,
  nome VARCHAR(45),
  FOREIGN KEY (id_tipo_contato) REFERENCES TiposContatos(id)
);

-- Tabela: ContatosFornecedores
CREATE TABLE IF NOT EXISTS ContatosFornecedores (
  id_fornecedor VARCHAR(26) NOT NULL,
  id_contato VARCHAR(26) NOT NULL,
  PRIMARY KEY (id_fornecedor, id_contato),
  FOREIGN KEY (id_fornecedor) REFERENCES Fornecedores(id),
  FOREIGN KEY (id_contato) REFERENCES Contatos(id)
);

-- Tabela: Usuarios
CREATE TABLE IF NOT EXISTS Usuarios (
  id VARCHAR(26) PRIMARY KEY,
  nome VARCHAR(80),
  dt_nascimento DATE
);

-- Tabela: Autenticacao
CREATE TABLE IF NOT EXISTS Autenticacao (
  email VARCHAR(60) PRIMARY KEY,
  senha VARCHAR(60) NOT NULL,
  email_validado BOOLEAN NOT NULL DEFAULT 0
);

-- Tabela: Login
CREATE TABLE IF NOT EXISTS Login (
  id_usuario VARCHAR(26) NOT NULL,
  email VARCHAR(60) NOT NULL,
  data_ultimo_acesso TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (id_usuario, email),
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
  FOREIGN KEY (email) REFERENCES Autenticacao(email)
);

-- Tabela: ContatosUsuarios
CREATE TABLE IF NOT EXISTS ContatosUsuarios (
  id_usuario VARCHAR(26) NOT NULL,
  id_contato VARCHAR(26) NOT NULL,
  PRIMARY KEY (id_usuario, id_contato),
  FOREIGN KEY (id_usuario) REFERENCES Usuarios(id),
  FOREIGN KEY (id_contato) REFERENCES Contatos(id)
);

-- Tabela: Movimentacoes
CREATE TABLE IF NOT EXISTS Movimentacoes (
  id_produto VARCHAR(26) NOT NULL,
  id_usuario VARCHAR(26) NOT NULL,
  email VARCHAR(60) NOT NULL,
  movimento ENUM('entrada', 'saida') NOT NULL,
  PRIMARY KEY (id_produto, id_usuario, email),
  FOREIGN KEY (id_produto) REFERENCES Produtos(id),
  FOREIGN KEY (id_usuario, email) REFERENCES Login(id_usuario, email)
);

-- Inserts iniciais
INSERT IGNORE INTO TiposContatos (id, nome) VALUES
  (1, 'tel'),
  (2, 'site'),
  (3, 'email'),
  (4, 'whatsapp'),
  (5, 'tel_whats');

INSERT IGNORE INTO Medidas (id, nome, sigla) VALUES
  (1, 'Grama', 'g'),
  (2, 'Quilograma', 'kg'),
  (3, 'Mililitro', 'ml'),
  (4, 'Litro', 'l'),
  (5, 'Unidade', 'un'),
  (6, 'Caixa', 'cx'),
  (7, 'Pacote', 'pc'),
  (8, 'Saco', 'saco'),
  (9, 'Lata', 'lata'),
  (10, 'Cacho', 'cacho'),
  (11, 'Cartão', 'cart'),
  (12, 'Caixote', 'cxote');
