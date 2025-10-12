import {Router} from 'express'
import { PartidaController } from '../controllers/partida.controllers.js'
import { partidaService, solicitacaoService } from '../../application/serviceInstances.js';
import { SolicitacaoController } from '../controllers/solicitacao.controllers.js'

export const partida_router = Router();
const partidaController = new PartidaController(partidaService);
const solicitacaoController = new SolicitacaoController(solicitacaoService);

partida_router.post('/', partidaController.create);
partida_router.get('/',partidaController.listar);
partida_router.patch('/:id_partida', partidaController.atualizar);

//solicitacoes
partida_router.post('/:id_partida/solicitacoes', solicitacaoController.solicitar);
partida_router.patch('/:id_partida/solicitacoes/:id_solicitacao', solicitacaoController.aceitar_recusar);
partida_router.get(':id_partida/solicitacoes', solicitacaoController.listar);