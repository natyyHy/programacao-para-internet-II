// CONFIGURACAO DO SERVIDOR

import express from "express";
import type {Request, Response} from "express";
import {router} from './presentation/routes/index.routes.js';
import { global_error_middleware } from "./presentation/middleware/global_error_exception.js";
import { log_middleware } from "./presentation/middleware/log_middleware.js";
// CONFIGURACAO

const app = express();
const PORTA = 3000;

// para express entender que usaremos json no corpo das req
app.use(express.json());

// middlewares
app.use(log_middleware);

// adicionar roteadores
app.use(router);

// tratamentos de erros globais
app.use(global_error_middleware);

// INICIALIZANDO...
app.get('/', (req: Request, res: Response) => {
    res.send("✨ API funcionando!...")
});

app.listen(PORTA, () => {
    console.log(`💫 Porta rodando em: http://localhost:${PORTA}`);
});