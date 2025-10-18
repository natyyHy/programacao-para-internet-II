import {JogadorService} from '../../application/jogador.service.js'
import {criarJogadorSchema, paramsSchemaListarJogador} from '../schemas/index.js'
import type {NextFunction, Request, Response} from "express";

export class JogadorController {
    constructor(private jogadorService: JogadorService){

    }

    public criar = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const bodyJogador = criarJogadorSchema.parse(req.body);
            const novoJogador = this.jogadorService.criarJogador(bodyJogador);
            res.status(201).json(novoJogador);
    
        }catch(error) {
            next(error);
        }
    };

    public visualizarJogador = async (req: Request , res:Response, next: NextFunction) => {
    
        try {
            const {id_jogador} = paramsSchemaListarJogador.parse(req.params);
            const jogador = this.jogadorService.buscarJogador(id_jogador);
            res.status(200).json(jogador)
    
        } catch (error) {
            next(error);
        }
    };
}