import { Solicitacao ,Participante} from '../presentation/models/index.models.js'
import { JogadorService } from './jogador.service.js';
import { PartidaService } from './partida.service.js';
import {gerarId} from '../presentation/utils/utils.js'
import { ParticipanteService } from './participante.service.js';
import { NotFoundException } from './exceptions/notFoundExcepion.js';

export class SolicitacaoService {

    private solicitacoesBD: Solicitacao[] = [];

    constructor(private jogadorService: JogadorService, private partidaService: PartidaService,
        private participanteService : ParticipanteService
    ) { }

    public criar(novaSolicitacao: Solicitacao): Solicitacao {
        // validar jogador
        this.jogadorService.buscarJogador(novaSolicitacao.id_jogador);

        // validar partida
        this.partidaService.buscarPartidaId(novaSolicitacao.id_partida);

        this.solicitacoesBD.push(novaSolicitacao);
        return novaSolicitacao;
    }

    public buscarSolicitacaoId(idSolicitacao: string): Solicitacao{
        const solicitacao = this.solicitacoesBD.find(sol => sol.id_solicitacao === idSolicitacao);
        if(!solicitacao){
            throw new NotFoundException(`Solicitacao com o ID ${idSolicitacao} nao foi encontrado`);
        }
        return solicitacao;

    }

    public aceitar(idSolicitacao: string) : Solicitacao {
        //validar
        const solicitacao = this.buscarSolicitacaoId(idSolicitacao);

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
        return solicitacao;
    }


    public recusar(idSolicitacao : string) : Solicitacao {
        //validar
        const solicitacao = this.buscarSolicitacaoId(idSolicitacao);

        solicitacao.status = 'recusada';
        return solicitacao;
    }

    public listarPorIdPartida(idPartida : string) : Solicitacao[] {
        const solicitacoes = this.solicitacoesBD.filter(sol => sol.id_partida === idPartida);
        if(!solicitacoes){
            throw new NotFoundException(`Nenhuma solicitacao encontrada para essa partida`);
        }
        return solicitacoes;
    }
}