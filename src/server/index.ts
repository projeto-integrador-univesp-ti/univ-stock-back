#!/usr/bin/env node

/**
 * Módulo de dependências
 */
import app from '../app'
import debug from 'debug';
import http from 'http';

/**
 * Obter a porta do ambiente e armazená-la no Express
 */
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Criar o servidor HTTP
 */
const server = http.createServer(app);

/**
 * Escutar na porta fornecida, em todas as interfaces de rede
 */
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normaliza uma porta para número, string ou false.
 */
function normalizePort(val: string): string | number | false {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    // Pipe nomeado
    return val;
  }

  if (port >= 0) {
    // Número da porta
    return port;
  }

  return false;
}

/**
 * Ouvinte de evento para o erro do servidor HTTP
 */
function onError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // Lidar com erros específicos de escuta com mensagens amigáveis
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Ouvinte de evento para o servidor HTTP "listening"
 */
function onListening(): void {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr?.port;
  debug('Listening on ' + bind);
}
