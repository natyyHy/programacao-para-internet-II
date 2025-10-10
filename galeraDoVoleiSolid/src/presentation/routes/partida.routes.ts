import {Router} from 'express'
import { PartidaController } from '../controllers/partida.controllers.js'
import { partidaService } from '../../application/serviceInstances.js';

export const partida_router = Router();
const partidaController = new PartidaController(partidaService);

partida_router.post('/', partidaController.create);
partida_router.get('/',partidaController.listar);