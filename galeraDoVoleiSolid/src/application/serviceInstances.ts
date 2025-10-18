import { JogadorService } from '../application/jogador.service.js';
import { PartidaService } from '../application/partida.service.js';
import { ParticipanteService } from '../application/participante.service.js';
import { SolicitacaoService } from './solicitacao.service.js';


export const jogadorService = new JogadorService();
export const participanteService = new ParticipanteService();
export const partidaService = new PartidaService(jogadorService,participanteService);
export const solicitacaoService = new SolicitacaoService(jogadorService,partidaService,participanteService);
