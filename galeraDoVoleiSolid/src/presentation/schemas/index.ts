import { z } from 'zod';

export const criarJogadorSchema = z.object({
    nome: z.string().min(3, {message: 'O nome é obrigatorio ou deve ter no minimo 3 carac.'}),
    categoria: z.string({message: 'A categoria é obrigatoria'}),
    sexo: z.string({message: 'O sexo é obrigatorio'}),
    data_nascimento: z.string().transform((str) => new Date(str)), //converter para string para Date
    organizador: z.boolean().default(false)
    
});

export const criarPartidaSchema = z.object({
    id_organizador: z.string({message:'O id de organizador é obrigatorio'}).min(1,{message: 'O id de organizador deve ter no minimo 1 carac.'}),
    nome: z.string().min(3,{message: 'O nome é obrigatorio ou deve ter no minimo 3 carac.'}),
    local: z.string({message: 'O local é obrigatorio'}),
    data_hora: z.string({message: 'O data e hora é obrigatorio'}),
    categoria: z.string({message: 'O categoria é obrigatorio'}),
    total_vagas: z.number({message: 'O total de vagas é obrigatorio'}).min(10,{message: 'O total de vagas deve ter no minimo 10'}).max(20, {message: 'O total de vagas deve ter no maximo 20'}),
    preco_por_jogador: z.number({message: 'O preco por jogador é obrigatorio'})
    
});

export const paramsSchemaCriarSolicitacao = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'})
})

export const criarSolicitacaoSchema = z.object({
    id_jogador: z.string({message: 'O id do jogador é obrigatorio'}).min(1, {message: 'O id do jogador é obrigatorio'})
})

export const paramsSchemaListarJogador = z.object({
    id_jogador: z.string({message: "O id jogador é obrigatorio"}).min(1)
})

export const paramsSchemaListarSolicitacoes = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'}).min(1)
})

export const paramsSchemaAlterarSolicitacao = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'}).min(1),
    id_solicitacao: z.string({message: 'O id da solicitacao é obrigatorio'}).min(1)
})

export const bodySchemaAlterarSolicitacao = z.object({
    status: z.enum(['aceita', 'recusada'], {message: 'O status deve ser aceita ou recusada'})
})

export const paramsSchemaAtualizarPartida = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'}).min(1)
})

export const bodySchemaAtualizarPartida = z.object({
    nome: z.string().min(3).optional(),
    local: z.string().optional(),
    data_hora: z.string().optional(),
    categoria: z.string().optional(),
    total_vagas: z.number().min(10).max(20).optional(),
    preco_por_jogador: z.number().optional()
})

export const paramsSchemaDesistirPartida = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'}).min(1),
    id_jogador: z.string({message: 'O id do jogador é obrigatorio'}).min(1)
})