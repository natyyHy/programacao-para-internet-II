import {Participante} from '../presentation/models/index.models.js'

export class ParticipanteService {

    private participantesBD: Participante[] = [];

    constructor(){

    }

    public buscarParticipante(idPartida: string, idJogador: string) : number {
        const index = this.participantesBD.findIndex(part => part.id_partida === idPartida && part.id_jogador == idJogador);
        return index;
    }

    public removerParticipante(index: number) : undefined {
        this.participantesBD.splice(index, 1);
    }

    public adicionarParticipante(novoParticipante : Participante){
        this.participantesBD.push(novoParticipante);
    }
}