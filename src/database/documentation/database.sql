-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema MiniStock
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema MiniStock
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `MiniStock` DEFAULT CHARACTER SET utf8 ;
USE `MiniStock` ;

-- -----------------------------------------------------
-- Table `MiniStock`.`Medidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Medidas` (
  `id` INT NOT NULL,
  `nome` VARCHAR(15) NOT NULL,
  `sigla` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Produtos` (
  `id` CHAR(26) NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `quantidade` DECIMAL(10,2) NOT NULL,
  `preco_unidade` DECIMAL(10,2) NOT NULL,
  `codigo` VARCHAR(45) NOT NULL,
  `codigo_barras` VARCHAR(15) NULL,
  `marca` VARCHAR(45) NULL,
  `perecivel` TINYINT NULL DEFAULT 0,
  `id_medida` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Produtos_Medidas1_idx` (`id_medida` ASC) VISIBLE,
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_Medidas1`
    FOREIGN KEY (`id_medida`)
    REFERENCES `MiniStock`.`Medidas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Lotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Lotes` (
  `id` CHAR(26) NOT NULL,
  `id_produto` CHAR(26) NOT NULL,
  `dt_fabricacao` DATE NULL,
  `dt_validade` DATE NULL,
  `observacoes` VARCHAR(255) NULL,
  PRIMARY KEY (`id`, `id_produto`),
  INDEX `fk_Lotes_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_Lotes_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `MiniStock`.`Produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Fornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Fornecedores` (
  `id` CHAR(26) NOT NULL,
  `cnpj` VARCHAR(14) NULL,
  `nome_razao_social` VARCHAR(80) NULL,
  `nome_fantasia` VARCHAR(80) NOT NULL,
  `cep_logradouro` VARCHAR(8) NULL,
  `nome_logradouro` VARCHAR(80) NULL,
  `numero_logradouro` VARCHAR(10) NULL,
  `complemento_logradouro` VARCHAR(45) NULL,
  `bairro_logradouro` VARCHAR(25) NULL,
  `cidade_logradouro` VARCHAR(25) NULL,
  `estado_logradouro` VARCHAR(25) NULL,
  `observacoes` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cnpj_UNIQUE` (`cnpj` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`ProdutosFornecidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`ProdutosFornecidos` (
  `id_produto` CHAR(26) NOT NULL,
  `id_fornecedor` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_produto`, `id_fornecedor`),
  INDEX `fk_Produtos_has_Fornecedores_Fornecedores1_idx` (`id_fornecedor` ASC) VISIBLE,
  INDEX `fk_Produtos_has_Fornecedores_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_has_Fornecedores_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `MiniStock`.`Produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_has_Fornecedores_Fornecedores1`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `MiniStock`.`Fornecedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`TiposContatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`TiposContatos` (
  `id` INT NOT NULL,
  `nome` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `MiniStock`.`Contatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Contatos` (
  `id` CHAR(26) NOT NULL,
  `id_tipo_contato` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Contatos_TiposContatos1_idx` (`id_tipo_contato` ASC) VISIBLE,
  CONSTRAINT `fk_Contatos_TiposContatos1`
    FOREIGN KEY (`id_tipo_contato`)
    REFERENCES `MiniStock`.`TiposContatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`ContatosFornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`ContatosFornecedores` (
  `id_fornecedor` CHAR(26) NOT NULL,
  `id_contato` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_fornecedor`, `id_contato`),
  INDEX `fk_Fornecedores_has_Contatos_Contatos1_idx` (`id_contato` ASC) VISIBLE,
  INDEX `fk_Fornecedores_has_Contatos_Fornecedores1_idx` (`id_fornecedor` ASC) VISIBLE,
  CONSTRAINT `fk_Fornecedores_has_Contatos_Fornecedores1`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `MiniStock`.`Fornecedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fornecedores_has_Contatos_Contatos1`
    FOREIGN KEY (`id_contato`)
    REFERENCES `MiniStock`.`Contatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Usuarios` (
  `id` CHAR(26) NOT NULL,
  `nome` VARCHAR(80) NULL,
  `dt_nascimento` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Autenticacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Autenticacao` (
  `email` VARCHAR(60) NOT NULL,
  `senha` VARCHAR(60) NOT NULL,
  `email_validado` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Login` (
  `id_usuario` CHAR(26) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `dt_ultimo_acesso` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`, `email`),
  INDEX `fk_Autenticacao_has_Usuarios_Usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Autenticacao_has_Usuarios_Autenticacao1_idx` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_Autenticacao_has_Usuarios_Autenticacao1`
    FOREIGN KEY (`email`)
    REFERENCES `MiniStock`.`Autenticacao` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Autenticacao_has_Usuarios_Usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `MiniStock`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`ContatosUsuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`ContatosUsuarios` (
  `id_usuario` CHAR(26) NOT NULL,
  `id_contato` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_contato`),
  INDEX `fk_Usuarios_has_Contatos_Contatos1_idx` (`id_contato` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Contatos_Usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Contatos_Usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `MiniStock`.`Usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Contatos_Contatos1`
    FOREIGN KEY (`id_contato`)
    REFERENCES `MiniStock`.`Contatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Movimentacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Movimentacoes` (
  `id` VARCHAR(26) NOT NULL,
  `id_produto` CHAR(26) NOT NULL,
  `id_usuario` CHAR(26) NOT NULL,
  `email` VARCHAR(60) NULL,
  `movimento` ENUM('entrada', 'saida') NOT NULL,
  `quantidade` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Produtos_has_Login_Login1_idx` (`id_usuario` ASC, `email` ASC) VISIBLE,
  INDEX `fk_Produtos_has_Login_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_has_Login_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `MiniStock`.`Produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_has_Login_Login1`
    FOREIGN KEY (`id_usuario` , `email`)
    REFERENCES `MiniStock`.`Login` (`id_usuario` , `email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`Vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`Vendas` (
  `id` VARCHAR(45) NOT NULL,
  `preco_total` DECIMAL(10,2) NULL,
  `data_venda` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `MiniStock`.`ProdutosVenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `MiniStock`.`ProdutosVenda` (
  `id_venda` VARCHAR(45) NOT NULL,
  `id_produto` CHAR(26) NOT NULL,
  `id_medida` INT NOT NULL,
  `quantidade` DECIMAL(10,2) NULL,
  `preco_unidade` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id_venda`, `id_produto`, `id_medida`),
  INDEX `fk_ProdutosVenda_Medidas1_idx` (`id_medida` ASC) VISIBLE,
  INDEX `fk_ProdutosVenda_Vendas1_idx` (`id_venda` ASC) VISIBLE,
  INDEX `fk_ProdutosVenda_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_ProdutosVenda_Medidas1`
    FOREIGN KEY (`id_medida`)
    REFERENCES `MiniStock`.`Medidas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProdutosVenda_Vendas1`
    FOREIGN KEY (`id_venda`)
    REFERENCES `MiniStock`.`Vendas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProdutosVenda_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `MiniStock`.`Produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
