import { PartidaService } from '../../application/partida.service.js'
import { criarPartidaSchema , paramsSchemaAtualizarPartida, bodySchemaAtualizarPartida,
    paramsSchemaDesistirPartida
} from '../schemas/index.js'
import { ZodError } from 'zod';
import type { Request, Response } from "express";

export class PartidaController {
    constructor(private partidaService: PartidaService) { }

    public criar = async (req: Request, res: Response) => {
        try {
            const bodyPartida = criarPartidaSchema.parse(req.body);
            const novaPartida = this.partidaService.criarPartida(bodyPartida);

            if (!novaPartida) {
                return res.status(404).json({ erro: 'Organizador não encontrado' });
            }

            res.status(201).json(novaPartida);

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    };

    public listar = async (req: Request, res: Response) => {
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
            res.status(400).json({ erro: 'Erro ao listar partidas' });
        }
    };

    public atualizar = async (req: Request, res: Response) => {
        try {
            const {id_partida} = paramsSchemaAtualizarPartida.parse(req.params);
            const bodyAtualizarPartida = bodySchemaAtualizarPartida.parse(req.body);
            
            const partida = this.partidaService.atualizar(id_partida, bodyAtualizarPartida);

            if(!partida){
                return res.status(404).json({erro: 'Partida nao encontrada'});
            }

            res.status(200).json(partida)
            
        } catch (error) {
            if(error instanceof ZodError){
                return res.status(400).json({erro: 'Dados de entrada invalidos'})
            }
            return res.status(500).json({erro: 'Erro interno do servidor'})
        }
    }

}