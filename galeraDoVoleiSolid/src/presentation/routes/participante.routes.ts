import {Router} from 'express'
import { PartidaController } from '../controllers/partida.controllers.js'
import { partidaService } from '../../application/serviceInstances.js';

export const participante_router = Router();
const participanteController = new PartidaController(partidaService);

participante_router.delete('/:id_partida/:id_jogador', participanteController.desistir);