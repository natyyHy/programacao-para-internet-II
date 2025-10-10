import { JogadorService } from '../application/jogador.service.js';
import { PartidaService } from '../application/partida.service.js';


export const jogadorService = new JogadorService();
export const partidaService = new PartidaService(jogadorService);