import { AtualizarPartida, Partida , Participante,BodyPartida} from '../presentation/models/index.models.js'
import { JogadorService } from './jogador.service.js'
import {ParticipanteService} from './participante.service.js'
import { gerarId } from '../presentation/utils/utils.js'
import { NotFoundException } from './exceptions/notFoundExcepion.js';

export class PartidaService {

    private partidasBD: Partida[] = [];

    constructor(private jogadorService: JogadorService,private participanteService : ParticipanteService) { }

    public criarPartida(bodyPartida: BodyPartida): Partida {

        //ja lanca excecao
        this.jogadorService.buscarJogador(bodyPartida.id_organizador);

        //se chegou aqui, jog existe
        this.jogadorService.marcarComoOrganizador(bodyPartida.id_organizador);

        const novaPartida: Partida = {
            id_partida: gerarId(),
            ...bodyPartida,
            situacao: 'em adesao'
        }

        this.partidasBD.push(novaPartida);
        return novaPartida;
    }


    public filtrarPartidas(filtros: {
        local?: string;
        data_hora?: string;
        categoria?: string;
        situacao?: string;
    }): Partida[] {
        let partidasFiltradas = [...this.partidasBD];

        if (filtros.local) {
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.local.toLowerCase() === filtros.local!.toLowerCase()
            );
        }

        if (filtros.data_hora) {
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.data_hora.startsWith(filtros.data_hora!)
            );
        }

        if (filtros.categoria) {
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.categoria.toLowerCase() === filtros.categoria!.toLowerCase()
            );
        }

        if (filtros.situacao) {
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.situacao.toLowerCase() === filtros.situacao!.toLowerCase()
            );
        }

        return partidasFiltradas;
    }

    public atualizar(idPartida : string, bodyPartida: AtualizarPartida) : Partida {
        const partida = this.partidasBD.find(part => part.id_partida === idPartida)

        if(!partida){
            throw new NotFoundException(`Partida com o ID ${idPartida} nao foi encontrado`);
        }

        if(bodyPartida.nome !== undefined){
            partida!.nome = bodyPartida.nome
        }

        if(bodyPartida.local !== undefined){
            partida!.local = bodyPartida.local
        }

        if(bodyPartida.data_hora !== undefined){
            partida!.data_hora = bodyPartida.data_hora
        }

        if(bodyPartida.categoria !== undefined){
            partida!.categoria = bodyPartida.categoria
        }

        if(bodyPartida.total_vagas !== undefined){
            partida!.total_vagas = bodyPartida.total_vagas
        }

        if(bodyPartida.preco_por_jogador !== undefined){
            partida!.preco_por_jogador = bodyPartida.preco_por_jogador
        }

        return partida;
    }

    public desistir(idPartida : string, idJogador : string) {

        const partida = this.buscarPartidaId(idPartida);
        if (!partida) {
            throw new NotFoundException(`Partida com o ID ${idPartida} nao foi encontrado`);
        }

        const indexParticipante = this.participanteService.buscarParticipante(idPartida, idJogador);

        if (indexParticipante === -1) {
            throw new NotFoundException(`Participante com ID ${idJogador} nao foi encontrado na partida ${idPartida}`);
        }

        this.participanteService.removerParticipante(indexParticipante);
    }

    public buscarPartidaId(idPartida : string) : Partida{
        const partida = this.partidasBD.find(part => part.id_partida === idPartida);
        if(!partida){
            throw new NotFoundException(`Partida com o ID ${idPartida} nao foi encontrado`);
        }
        return partida;
    }

    public listarParticipantes(idPartida : string) : Participante[] {
        this.buscarPartidaId(idPartida);
        return this.participanteService.listarPorPartida(idPartida);
    }
}