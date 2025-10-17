import {JogadorService} from '../../application/jogador.service.js'
import {criarJogadorSchema, paramsSchemaListarJogador} from '../schemas/index.js'
import {ZodError} from 'zod';

import type {Request, Response} from "express";

export class JogadorController {
    constructor(private jogadorService: JogadorService){

    }

    public criar = async (req: Request, res: Response) => {
        try {
            const bodyJogador = criarJogadorSchema.parse(req.body);
            const novoJogador = this.jogadorService.criarJogador(bodyJogador);
            res.status(201).json(novoJogador);
    
        }catch(error) {
            if(error instanceof ZodError){
                res.status(400).json({erro: "Dados de entrada invalidos"})
            }
        }
    };

    public visualizarJogador = async (req: Request , res:Response) => {
    
        try {
            const {id_jogador} = paramsSchemaListarJogador.parse(req.params);
            const jogador = this.jogadorService.buscarJogador(id_jogador);
    
            if(!jogador){
                return res.status(404).json({erro: 'Jogador nao encontrado'})
            }
    
            res.status(200).json(jogador)
    
        } catch (error) {
            if(error instanceof ZodError){
                res.status(400).json({erro: 'Dados de entrada invalidos'})
            }
        }
    };
}