import {Router} from 'express'
import { ParticipanteController } from '../controllers/participante.controllers.js'
import { partidaService } from '../../application/serviceInstances.js';

export const participante_router = Router();
const participanteController = new ParticipanteController(partidaService);

participante_router.delete('/:id_partida/:id_jogador', participanteController.desistir);