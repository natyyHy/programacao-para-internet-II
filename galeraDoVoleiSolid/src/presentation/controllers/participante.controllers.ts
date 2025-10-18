import { PartidaService } from '../../application/partida.service.js'
import { paramsSchemaDesistirPartida, paramsSchemaListarParticipantes } from '../schemas/index.js'
import { ZodError } from 'zod';
import type { NextFunction, Request, Response } from "express";

export class ParticipanteController {
    constructor(private partidaService: PartidaService) { }


    public desistir = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id_partida, id_jogador } = paramsSchemaDesistirPartida.parse(req.params);
            this.partidaService.desistir(id_partida, id_jogador);
            res.status(200).json({ message: 'Participante removido com sucesso' })

        } catch (error) {
            next(error);
        }
    }

    public listarParticipantes = (req: Request, res: Response,next: NextFunction) => {

        try {
            const { id_partida } = paramsSchemaListarParticipantes.parse(req.params);
            const participantesPartida = this.partidaService.listarParticipantes(id_partida);
            res.status(200).json(participantesPartida)
            
        } catch (error) {
            next(error);
        }
    }
}

