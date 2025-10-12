import {Router} from 'express'
import { jogador_router } from './jogador.routes.js'
import { partida_router } from './partida.routes.js'
import { participante_router } from './participante.routes.js';

const router = Router();

router.use('/jogadores', jogador_router);
router.use('/partidas', partida_router);
router.use('/participantes', participante_router);

export {router}