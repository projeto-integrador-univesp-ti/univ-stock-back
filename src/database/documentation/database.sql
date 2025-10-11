-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema ndt6hcozk7ig1qfc
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema ndt6hcozk7ig1qfc
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `ndt6hcozk7ig1qfc` DEFAULT CHARACTER SET utf8 ;
USE `ndt6hcozk7ig1qfc` ;

-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`medidas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`medidas` (
  `id` INT NOT NULL,
  `nome` VARCHAR(15) NOT NULL,
  `sigla` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`produtos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`produtos` (
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
  INDEX `fk_Produtos_medidas1_idx` (`id_medida` ASC) VISIBLE,
  UNIQUE INDEX `codigo_UNIQUE` (`codigo` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_medidas1`
    FOREIGN KEY (`id_medida`)
    REFERENCES `ndt6hcozk7ig1qfc`.`medidas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`lotes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`lotes` (
  `id` CHAR(26) NOT NULL,
  `id_produto` CHAR(26) NOT NULL,
  `dt_fabricacao` DATE NULL,
  `dt_validade` DATE NULL,
  `observacoes` VARCHAR(255) NULL,
  PRIMARY KEY (`id`, `id_produto`),
  INDEX `fk_Lotes_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_Lotes_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `ndt6hcozk7ig1qfc`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`fornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`fornecedores` (
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
-- Table `ndt6hcozk7ig1qfc`.`produtosfornecidos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`produtosfornecidos` (
  `id_produto` CHAR(26) NOT NULL,
  `id_fornecedor` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_produto`, `id_fornecedor`),
  INDEX `fk_Produtos_has_Fornecedores_Fornecedores1_idx` (`id_fornecedor` ASC) VISIBLE,
  INDEX `fk_Produtos_has_Fornecedores_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_Produtos_has_Fornecedores_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `ndt6hcozk7ig1qfc`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_has_Fornecedores_Fornecedores1`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `ndt6hcozk7ig1qfc`.`fornecedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`tiposcontatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`tiposcontatos` (
  `id` INT NOT NULL,
  `nome` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `nome_UNIQUE` (`nome` ASC) VISIBLE)
ENGINE = InnoDB
COMMENT = '	';


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`contatos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`contatos` (
  `id` CHAR(26) NOT NULL,
  `id_tipo_contato` INT NOT NULL,
  `nome` VARCHAR(45) NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Contatos_TiposContatos1_idx` (`id_tipo_contato` ASC) VISIBLE,
  CONSTRAINT `fk_Contatos_TiposContatos1`
    FOREIGN KEY (`id_tipo_contato`)
    REFERENCES `ndt6hcozk7ig1qfc`.`tiposcontatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`contatosfornecedores`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`contatosfornecedores` (
  `id_fornecedor` CHAR(26) NOT NULL,
  `id_contato` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_fornecedor`, `id_contato`),
  INDEX `fk_Fornecedores_has_Contatos_Contatos1_idx` (`id_contato` ASC) VISIBLE,
  INDEX `fk_Fornecedores_has_Contatos_Fornecedores1_idx` (`id_fornecedor` ASC) VISIBLE,
  CONSTRAINT `fk_Fornecedores_has_Contatos_Fornecedores1`
    FOREIGN KEY (`id_fornecedor`)
    REFERENCES `ndt6hcozk7ig1qfc`.`fornecedores` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Fornecedores_has_Contatos_Contatos1`
    FOREIGN KEY (`id_contato`)
    REFERENCES `ndt6hcozk7ig1qfc`.`contatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`usuarios` (
  `id` CHAR(26) NOT NULL,
  `nome` VARCHAR(80) NULL,
  `dt_nascimento` DATE NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`autenticacao`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`autenticacao` (
  `email` VARCHAR(60) NOT NULL,
  `senha` VARCHAR(60) NOT NULL,
  `email_validado` TINYINT NOT NULL DEFAULT 0,
  PRIMARY KEY (`email`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`login`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`login` (
  `id_usuario` CHAR(26) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `dt_ultimo_acesso` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_usuario`, `email`),
  INDEX `fk_Autenticacao_has_Usuarios_Usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  INDEX `fk_Autenticacao_has_Usuarios_Autenticacao1_idx` (`email` ASC) VISIBLE,
  CONSTRAINT `fk_Autenticacao_has_Usuarios_Autenticacao1`
    FOREIGN KEY (`email`)
    REFERENCES `ndt6hcozk7ig1qfc`.`autenticacao` (`email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Autenticacao_has_Usuarios_Usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ndt6hcozk7ig1qfc`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`contatosusuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`contatosusuarios` (
  `id_usuario` CHAR(26) NOT NULL,
  `id_contato` CHAR(26) NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_contato`),
  INDEX `fk_Usuarios_has_Contatos_Contatos1_idx` (`id_contato` ASC) VISIBLE,
  INDEX `fk_Usuarios_has_Contatos_Usuarios1_idx` (`id_usuario` ASC) VISIBLE,
  CONSTRAINT `fk_Usuarios_has_Contatos_Usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `ndt6hcozk7ig1qfc`.`usuarios` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Usuarios_has_Contatos_Contatos1`
    FOREIGN KEY (`id_contato`)
    REFERENCES `ndt6hcozk7ig1qfc`.`contatos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`movimentacoes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`movimentacoes` (
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
    REFERENCES `ndt6hcozk7ig1qfc`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Produtos_has_Login_Login1`
    FOREIGN KEY (`id_usuario` , `email`)
    REFERENCES `ndt6hcozk7ig1qfc`.`login` (`id_usuario` , `email`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`vendas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`vendas` (
  `id` VARCHAR(45) NOT NULL,
  `preco_total` DECIMAL(10,2) NULL,
  `data_venda` DATETIME NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `ndt6hcozk7ig1qfc`.`produtosvenda`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `ndt6hcozk7ig1qfc`.`produtosvenda` (
  `id_venda` VARCHAR(45) NOT NULL,
  `id_produto` CHAR(26) NOT NULL,
  `id_medida` INT NOT NULL,
  `quantidade` DECIMAL(10,2) NULL,
  `preco_unidade` DECIMAL(10,2) NULL,
  PRIMARY KEY (`id_venda`, `id_produto`, `id_medida`),
  INDEX `fk_ProdutosVenda_medidas1_idx` (`id_medida` ASC) VISIBLE,
  INDEX `fk_ProdutosVenda_Vendas1_idx` (`id_venda` ASC) VISIBLE,
  INDEX `fk_ProdutosVenda_Produtos1_idx` (`id_produto` ASC) VISIBLE,
  CONSTRAINT `fk_ProdutosVenda_medidas1`
    FOREIGN KEY (`id_medida`)
    REFERENCES `ndt6hcozk7ig1qfc`.`medidas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProdutosVenda_Vendas1`
    FOREIGN KEY (`id_venda`)
    REFERENCES `ndt6hcozk7ig1qfc`.`vendas` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_ProdutosVenda_Produtos1`
    FOREIGN KEY (`id_produto`)
    REFERENCES `ndt6hcozk7ig1qfc`.`produtos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
