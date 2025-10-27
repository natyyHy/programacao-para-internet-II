import {Router} from 'express'
import { ParticipanteController } from '../controllers/participante.controllers.js'
import { partidaService } from '../../application/serviceInstances.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

export const participante_router = Router();
const participanteController = new ParticipanteController(partidaService);

//autenticacao
// Desistir da partida
participante_router.delete('/:id_partida/:id_jogador', authMiddleware, participanteController.desistir);