import * as http from 'node:http';
import { router } from './routes.js';

const PORT = process.argv[2] || 3000;

const server = http.createServer(router);

server.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto:${PORT}/`);
});
