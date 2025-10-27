import { Router } from 'express'
import { PartidaController } from '../controllers/partida.controllers.js'
import { partidaService, solicitacaoService } from '../../application/serviceInstances.js';
import { SolicitacaoController } from '../controllers/solicitacao.controllers.js'
import { ParticipanteController } from '../controllers/participante.controllers.js';
import { authMiddleware } from '../middlewares/auth_middleware.js';

export const partida_router = Router();
const partidaController = new PartidaController(partidaService);
const solicitacaoController = new SolicitacaoController(solicitacaoService);
const participanteController = new ParticipanteController(partidaService);

//publico

//get listar partidas
partida_router.get('/', partidaController.listar);

//get participantes da partida
partida_router.get('/:id_partida/participantes', participanteController.listarParticipantes);


//autenticacao
partida_router.post('/', authMiddleware, partidaController.criar);
partida_router.post('/:id_partida/solicitacoes', authMiddleware, solicitacaoController.solicitar);
partida_router.patch('/:id_partida', authMiddleware, partidaController.atualizar);
partida_router.patch('/:id_partida/solicitacoes/:id_solicitacao', authMiddleware, solicitacaoController.aceitar_recusar);
partida_router.get('/:id_partida/solicitacoes', authMiddleware, solicitacaoController.listar);
