import { Jogador } from '../presentation/models/index.models.js'
import { gerarId } from '../presentation/utils/utils.js';
import { NotFoundException } from './exceptions/notFoundExcepion.js';

export class JogadorService {

    private jogadoresBD: Jogador[] = [];

    constructor() {

    }

    //criar jogador
    public criarJogador(bodyJogador: Jogador): Jogador {
        const novoJogador: Jogador = {
            id_jogador: gerarId(),
            ...bodyJogador
        };
        this.jogadoresBD.push(novoJogador);
        return novoJogador;
    }

    //buscar jogador
    public buscarJogador(idJogador: string): Jogador {
        const jogador = this.jogadoresBD.find(jog => jog.id_jogador === idJogador)
        if (!jogador) {
            throw new NotFoundException(`Jogador com ID ${idJogador} nao foi encontrado`);
        }
        return jogador;
    }

    //marcar jogador como organizador
    public marcarComoOrganizador(idJogador: string): boolean {
        const jogador = this.buscarJogador(idJogador);
        jogador.organizador = true;
        return true;
    }

}
