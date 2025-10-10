import { Jogador } from '../presentation/models/index.models.js'
import { gerarId } from '../presentation/utils/utils.js';

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
    public buscarJogador(idJogador: string): Jogador | undefined {
        const jogador = this.jogadoresBD.find(jog => jog.id_jogador === idJogador)
        if (jogador) {
            return jogador;
        }
        return;
    }

    //marcar jogador como organizador
    public marcarComoOrganizador(idJogador: string): boolean {
        const jogador = this.jogadoresBD.find(jog => jog.id_jogador === idJogador);
        if (jogador) {
            jogador.organizador = true;
            return true;
        }
        return false;
    }

}
