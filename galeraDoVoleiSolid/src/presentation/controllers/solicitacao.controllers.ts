import {
    paramsSchemaCriarSolicitacao, criarSolicitacaoSchema,
    bodySchemaAlterarSolicitacao, paramsSchemaAlterarSolicitacao,
    paramsSchemaListarSolicitacoes
} from '../schemas/index.js'
import { SolicitacaoService } from '../../application/solicitacao.service.js'
import { Solicitacao } from '../models/index.models.js'
import type { Request, Response } from 'express';
import { gerarId } from '../utils/utils.js'
import { ZodError } from 'zod';


export class SolicitacaoController {

    constructor(private solicitacaoService: SolicitacaoService) { };

    public solicitar = async (req: Request, res: Response) => {

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

            if (!solicitacaoCriada) {
                res.status(400).json({ erro: 'Nao foi possivel criar a solicitacao' })
            }

            res.status(201).json(novaSolicitacao);

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    }


    public aceitar_recusar = async (req: Request, res: Response) => {
        try {
            const { id_partida, id_solicitacao } = paramsSchemaAlterarSolicitacao.parse(req.params);
            const { status } = bodySchemaAlterarSolicitacao.parse(req.body);

            const solicitacao = this.solicitacaoService.buscarSolicitacaoId(id_solicitacao);

            if (!solicitacao) {
                res.status(404).json({ erro: 'Solicitacao nao encontrada para essa partida' });
                return;
            }

            if (solicitacao.status === status) {
                return res.status(404).json({ erro: `A solicitacao já foi ${status}` });
            }

            let solicitacaoAtualizada;
            if (status === 'aceita') {
                solicitacaoAtualizada = this.solicitacaoService.aceitar(id_solicitacao);
                if (!solicitacaoAtualizada) {
                    return res.status(404).json({ erro: 'Partida associada não foi encontrada.' });
                }
            }

            // para ambos casos
            solicitacao.status = status;
            res.status(200).json({ solicitacao })

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    }

    public listar = async (req: Request, res: Response) => {
        try {
            const { id_partida } = paramsSchemaListarSolicitacoes.parse(req.params);
            const {status} = req.query;

            let solicitacoesPartida = this.solicitacaoService.listarPorIdPartida(id_partida);

            if(!solicitacoesPartida){
                return res.status(404).json({ erro: 'Nenhuma solicitacao encontrada para essa partida' });
            }

            if(status){
                solicitacoesPartida = solicitacoesPartida.filter(sol => sol.status === status);
            }
            
            res.status(200).json(solicitacoesPartida)

        } catch (error) {
            if (error instanceof ZodError) {
                res.status(400).json({ erro: 'Dados de entrada invalidos' })
            }
        }
    }
}