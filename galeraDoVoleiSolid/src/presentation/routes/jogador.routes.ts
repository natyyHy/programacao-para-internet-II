import { Router } from 'express'
import { JogadorController } from '../controllers/jogador.controllers.js'
import { jogadorService } from '../../application/serviceInstances.js'


export const jogador_router = Router();
const jogadorController = new JogadorController(jogadorService);

// Publico

// cadastro jogador
jogador_router.post('/', jogadorController.criar);

// visualizar perfil jogador
jogador_router.get('/:id_jogador', jogadorController.visualizarJogador);

