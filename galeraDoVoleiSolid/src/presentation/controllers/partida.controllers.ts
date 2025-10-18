import { PartidaService } from '../../application/partida.service.js'
import { criarPartidaSchema , paramsSchemaAtualizarPartida, bodySchemaAtualizarPartida,
    paramsSchemaDesistirPartida
} from '../schemas/index.js'
import { ZodError } from 'zod';
import type { NextFunction, Request, Response } from "express";

export class PartidaController {
    constructor(private partidaService: PartidaService) { }

    public criar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodyPartida = criarPartidaSchema.parse(req.body);
            const novaPartida = this.partidaService.criarPartida(bodyPartida);
            res.status(201).json(novaPartida);

        } catch (error) {
            next(error);
        }
    };

    public listar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { local, data_hora, categoria, situacao } = req.query;

            const filtros = {
                local: local as string,
                data_hora: data_hora as string,
                categoria: categoria as string,
                situacao: situacao as string
            };

            const partidas = this.partidaService.filtrarPartidas(filtros);
            res.status(200).json(partidas);

        } catch (error) {
            next(error);
        }
    };

    public atualizar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const {id_partida} = paramsSchemaAtualizarPartida.parse(req.params);
            const bodyAtualizarPartida = bodySchemaAtualizarPartida.parse(req.body);
            const partida = this.partidaService.atualizar(id_partida, bodyAtualizarPartida);

            res.status(200).json(partida)
            
        } catch (error) {
            next(error);
        }
    }

}