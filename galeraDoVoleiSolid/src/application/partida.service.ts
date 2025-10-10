import { Partida } from '../presentation/models/index.models.js'
import { JogadorService } from './jogador.service.js'
import { gerarId } from '../presentation/utils/utils.js'

export class PartidaService {

    private partidasBD: Partida[] = [];

    constructor(private jogadorService: JogadorService) { }

    public criarPartida(bodyPartida: Partida): Partida | undefined {

        const organizador = this.jogadorService.buscarJogador(bodyPartida.id_organizador);

        if (!organizador) {
            return;
        }

        this.jogadorService.marcarComoOrganizador(bodyPartida.id_organizador);

        const novaPartida: Partida = {
            id_partida: gerarId(),
            situacao: 'em adesao',
            ...bodyPartida
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
            {
                if(partida.situacao == 'em adesao'|| partida.situacao == 'cancelada' || partida.situacao == 'confirmada'){
                    partida.situacao.toLowerCase() === filtros.situacao!.toLowerCase();
                }
            }
            );
        }

        return partidasFiltradas;
    }

    public atualizar(idPartida : string, bodyPartida: Partida) : Partida | undefined {
        const partida = partidasBD.find(part => part.id_partida === id_partida)

        if(!partida){
            return;
        }

        

        if(bodyAtualizarPartida.nome !== undefined){
            partida!.nome = bodyAtualizarPartida.nome
        }

        if(bodyAtualizarPartida.local !== undefined){
            partida!.local = bodyAtualizarPartida.local
        }

        if(bodyAtualizarPartida.data_hora !== undefined){
            partida!.data_hora = bodyAtualizarPartida.data_hora
        }

        if(bodyAtualizarPartida.categoria !== undefined){
            partida!.categoria = bodyAtualizarPartida.categoria
        }

        if(bodyAtualizarPartida.total_vagas !== undefined){
            partida!.total_vagas = bodyAtualizarPartida.total_vagas
        }

        if(bodyAtualizarPartida.preco_por_jogador !== undefined){
            partida!.preco_por_jogador = bodyAtualizarPartida.preco_por_jogador
        }
    }
}