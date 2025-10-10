import {Router} from 'express'
import { jogador_router } from './jogador.routes.js'
import { partida_router } from './partida.routes.js'

const router = Router();

router.use('/jogadores', jogador_router);
router.use('/partidas', partida_router);

export {router}