import { Router } from 'express'
import { JogadorController } from '../controllers/jogador.controllers.js'
import { jogadorService } from '../../application/serviceInstances.js'


export const jogador_router = Router();
const jogadorController = new JogadorController(jogadorService);

jogador_router.post('/', jogadorController.create);
jogador_router.get('/:id_jogador', jogadorController.visualizarJogador);