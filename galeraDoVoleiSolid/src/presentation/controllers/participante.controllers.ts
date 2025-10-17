import { PartidaService } from '../../application/partida.service.js'
import { paramsSchemaDesistirPartida, paramsSchemaListarParticipantes } from '../schemas/index.js'
import { ZodError } from 'zod';
import type { Request, Response } from "express";

export class ParticipanteController {
    constructor(private partidaService: PartidaService) { }


    public desistir = async (req: Request, res: Response) => {
        try {
            const { id_partida, id_jogador } = paramsSchemaDesistirPartida.parse(req.params);
            const resultBool = this.partidaService.desistir(id_partida, id_jogador);

            if (!resultBool) {
                res.status(404).json({ erro: 'Participante nao encontrado para essa partida' })
            }

            res.status(200).json({ message: 'Participante removido com sucesso' })

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    }

    public listarParticipantes = (req: Request, res: Response) => {

        try {
            const { id_partida } = paramsSchemaListarParticipantes.parse(req.params);
            const participantesPartida = this.partidaService.listarParticipantes(id_partida);

            if (!participantesPartida) {
                res.status(404).json({ erro: 'Nenhum participante encontrado para essa partida' })
            }

            res.status(200).json(participantesPartida)
        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    }
}

