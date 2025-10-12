import { Solicitacao ,Participante} from '../presentation/models/index.models.js'
import { JogadorService } from './jogador.service.js';
import { PartidaService } from './partida.service.js';
import {gerarId} from '../presentation/utils/utils.js'
import { ParticipanteService } from './participante.service.js';

export class SolicitacaoService {

    private solicitacoesBD: Solicitacao[] = [];

    constructor(private jogadorService: JogadorService, private partidaService: PartidaService,
        private participanteService : ParticipanteService
    ) { }

    public criar(novaSolicitacao: Solicitacao): Solicitacao | undefined {
        // validar jogador
        const jogador = this.jogadorService.buscarJogador(novaSolicitacao.id_jogador);
        if (!jogador) {
            return;
        }

        // validar partida
        const partida = this.partidaService.buscarPartidaId(novaSolicitacao.id_partida);
        if (!partida) {
            return;
        }

        this.solicitacoesBD.push(novaSolicitacao);
        return novaSolicitacao;
    }

    public buscarSolicitacaoId(idSolicitacao: string): Solicitacao | undefined {
        return this.solicitacoesBD.find(sol => sol.id_solicitacao === idSolicitacao);
    }

    public aceitar(idSolicitacao: string) : Solicitacao | undefined {
        const solicitacao = this.solicitacoesBD.find(sol => sol.id_solicitacao === idSolicitacao);
        if (!solicitacao) {
            return;
        }

        solicitacao.status = 'aceita';

        const partidaEncontrada = this.partidaService.buscarPartidaId(solicitacao.id_partida);
        const novoParticipante: Participante = {
            id_participante: gerarId(),
            id_partida: solicitacao.id_partida,
            id_jogador: solicitacao.id_jogador,
            data_confirmacao: String(new Date()),
            preco_pagamento: partidaEncontrada?.preco_por_jogador || 0,
            status_pagamento: 'pendente'
        }

        this.participanteService.adicionarParticipante(novoParticipante);
    }

    public recusar(idSolicitacao : string) : Solicitacao | undefined {
        const solicitacao = this.solicitacoesBD.find(sol => sol.id_solicitacao === idSolicitacao);
        if (!solicitacao) {
            return;
        }

        solicitacao.status = 'recusada';
        return solicitacao;
    }

    public listarPorIdPartida(idPartida : string) : Solicitacao[] | undefined {
        return this.solicitacoesBD.filter(sol => sol.id_partida === idPartida);
    }
}