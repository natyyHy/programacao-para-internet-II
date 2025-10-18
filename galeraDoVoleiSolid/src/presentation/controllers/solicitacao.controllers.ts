import {
    paramsSchemaCriarSolicitacao, criarSolicitacaoSchema,
    bodySchemaAlterarSolicitacao, paramsSchemaAlterarSolicitacao,
    paramsSchemaListarSolicitacoes
} from '../schemas/index.js'
import { SolicitacaoService } from '../../application/solicitacao.service.js'
import { Solicitacao } from '../models/index.models.js'
import type { Request, Response, NextFunction } from 'express';
import { gerarId } from '../utils/utils.js'
import { ZodError } from 'zod';
import { HTTPException } from '../exceptions/HTTPException.js';


export class SolicitacaoController {

    constructor(private solicitacaoService: SolicitacaoService) { };

    public solicitar = async (req: Request, res: Response, next: NextFunction) => {

        try {
            const { id_partida } = paramsSchemaCriarSolicitacao.parse(req.params);
            const bodySolicitacao = criarSolicitacaoSchema.parse(req.body);

            const novaSolicitacao: Solicitacao = {
                id_solicitacao: gerarId(),
                id_partida,
                id_jogador: bodySolicitacao.id_jogador,
                status: 'pendente',
                data_criacao: new Date()
            }
            const solicitacaoCriada = this.solicitacaoService.criar(novaSolicitacao);

            res.status(201).json(solicitacaoCriada);

        } catch (error) {
            next(error);
        }
    }


    public aceitar_recusar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id_partida, id_solicitacao } = paramsSchemaAlterarSolicitacao.parse(req.params);
            const { status } = bodySchemaAlterarSolicitacao.parse(req.body);

            const solicitacao = this.solicitacaoService.buscarSolicitacaoId(id_solicitacao);

            //validar se pertence
            if (solicitacao.id_partida !== id_partida) {
                throw new HTTPException(`Solicitacao nao encontrada para essa partida`, 400);
            }

            if (solicitacao.status === status) {
                throw new HTTPException(`A solicitacao já foi aceita/recusada`, 404);
            }

            let solicitacaoAtualizada;
            if (status === 'aceita') {
                solicitacaoAtualizada = this.solicitacaoService.aceitar(id_solicitacao);
            } else {
                solicitacaoAtualizada =  this.solicitacaoService.recusar(id_solicitacao);
            }

            res.status(200).json({ solicitacaoAtualizada })

        } catch (error) {
            next(error);
        }
    }

    public listar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { id_partida } = paramsSchemaListarSolicitacoes.parse(req.params);
            const {status} = req.query;

            let solicitacoesPartida = this.solicitacaoService.listarPorIdPartida(id_partida);

            if(status){
                solicitacoesPartida = solicitacoesPartida.filter(sol => sol.status === status);
            }
            
            res.status(200).json(solicitacoesPartida)

        } catch (error) {
            next(error);
        }
    }
}