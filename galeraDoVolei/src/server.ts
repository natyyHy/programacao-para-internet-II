import express from "express";
import type {Request, Response} from "express";
import {z , ZodError} from 'zod';
import { tr } from "zod/locales";

// Funcao de gerar ID
function gerarId(): string {
    return crypto.randomUUID();
};

// CONFIGURACAO

const app = express();
const PORTA = 3000;

// para express entender que usaremos json no corpo das req
app.use(express.json());

// Interfaces - estrutura dos objetos

interface Jogador {
    id_jogador: string,
    nome: string,
    categoria: string,
    sexo: string,
    data_nascimento: Date,
    organizador: boolean
};

interface Partida {
    id_partida: string,
    id_organizador: string,
    nome: string,
    local: string,
    data_hora: string,
    categoria: string,
    situacao: 'em adesao' | 'cancelada' | 'confirmada',
    total_vagas: number,
    preco_por_jogador: number
};

interface Solicitacao {
    id_solicitacao: string,
    id_partida: string,
    id_jogador: string,
    status: 'pendente' | 'aceita' | 'recusada',
    data_criacao: Date
};

interface Participante {
    id_participante: string,
    id_partida: string,
    id_jogador: string,
    data_confirmacao: string,
    preco_pagamento: number,
    status_pagamento: 'pendente' | 'aceita' | 'recusada'
};

// Arrays para simular banco de dados

const jogadoresBD: Jogador[] = [];
const partidasBD: Partida[] = [];
const solicitacoesBD: Solicitacao[] = [];
const participantesBD: Participante[] = [];

// --- ESPECIFICACAO DAS ROTAS E ESQUEMAS DE VALIDACAO COM ZOD ---

/*
    [1] POST - CRIAR JOGADOR - post/jogadores
    body: nome, categoria, sexo, data_nascimento
    response: 201, 400 
*/

const criarJogadorSchema = z.object({
    nome: z.string().min(3, {message: 'O nome é obrigatorio ou deve ter no minimo 3 carac.'}),
    categoria: z.string({message: 'A categoria é obrigatoria'}),
    sexo: z.string({message: 'O sexo é obrigatorio'}),
    data_nascimento: z.string().transform((str) => new Date(str)), //converter para string para Date
    organizador: z.boolean().default(false)
    
});

app.post('/jogadores', (req: Request, res: Response) => {
    try {
        const bodyJogador = criarJogadorSchema.parse(req.body)

        const novoJogador: Jogador = {
            id_jogador: gerarId(),
            ... bodyJogador
        };

        jogadoresBD.push(novoJogador);
        //const body = `Corpo da requisicao recebido -> ${JSON.stringify(req.body)}`
        res.status(201).json(novoJogador);

    }catch(error) {
        if(error instanceof ZodError){
            res.status(400).json({erro: "Dados de entrada invalidos"})
        }
    }
});


/*
    [2] POST - CRIAR PARTIDA - post/partidas
    body: id_organi, nome, local, data_hora, categoria, total_vagas, preco_por_jogador
    response: 201, 400 
*/

const criarPartidaSchema = z.object({
    id_organizador: z.string({message:'O id de organizador é obrigatorio'}).min(1,{message: 'O id de organizador deve ter no minimo 1 carac.'}),
    nome: z.string().min(3,{message: 'O nome é obrigatorio ou deve ter no minimo 3 carac.'}),
    local: z.string({message: 'O local é obrigatorio'}),
    data_hora: z.string({message: 'O data e hora é obrigatorio'}),
    categoria: z.string({message: 'O categoria é obrigatorio'}),
    total_vagas: z.number({message: 'O total de vagas é obrigatorio'}).min(10,{message: 'O total de vagas deve ter no minimo 10'}).max(20, {message: 'O total de vagas deve ter no maximo 20'}),
    preco_por_jogador: z.number({message: 'O preco por jogador é obrigatorio'})
    
});


app.post('/partidas', (req: Request, res: Response) => {

    try {

        const bodyPartida = criarPartidaSchema.parse(req.body);
        const novaPartida: Partida = {
            id_partida: gerarId(),
            situacao: 'em adesao',
            ...bodyPartida
        }

        partidasBD.push(novaPartida)
        res.status(201).json(novaPartida);


    } catch (error) {
        if(error instanceof ZodError) {
            res.status(400).json({erro: 'Dados de entrada invalidos'})
        }
    }

});



/*
    [3] POST - CRIAR SOLICITACAO - post/partidas/{id_partida}/solicitacoes
    params: id partida
    body: id_jogador
    response: 201, 400 
*/

const paramsSchemaCriarSolicitacao = z.object({
    id_partida: z.string({message: 'O id da partida é obrigatorio'})
})

const criarSolicitacaoSchema = z.object({
    id_jogador: z.string({message: 'O id do jogador é obrigatorio'}).min(1, {message: 'O id do jogador é obrigatorio'})
})

app.post('/partidas/:id_partida/solicitacoes', (req: Request , res: Response) => {

    try {
        const {id_partida} = paramsSchemaCriarSolicitacao.parse(req.params);

        const bodySolicitacao = criarSolicitacaoSchema.parse(req.body); //id jogador

        const novaSolicitacao : Solicitacao = {
            id_solicitacao: gerarId(),
            id_partida,
            id_jogador: bodySolicitacao.id_jogador,
            status: 'pendente',
            data_criacao: new Date()
        }
        solicitacoesBD.push(novaSolicitacao);

        res.status(201).json({
            mensagem: "Solicitacao criado com sucesso",
            jogador: novaSolicitacao
        });

    } catch (error){
        if(error instanceof ZodError) {
            res.status(400).json({erro: 'Dados de entrada invalidos'})
        }
    }
})


/*
    [4] GET - LISTAR PARTIDAS - get/partidas (com filtro)
    params: local, data hora, categoria , situacao
    response: 200,400
*/

app.get('/partidas', (req: Request, res: Response) => {

    try {

        let partidasFiltradas: Partida[] = [... partidasBD];
        const {local, data_hora, categoria, situacao} = req.query
        if(local){
            partidasFiltradas = partidasFiltradas.filter(partida => 
                partida.local.toLowerCase() === String(local).toLowerCase()
            )
        }

        if(data_hora){
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.data_hora.startsWith(String(data_hora))
            )
        }

        if(categoria){
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.categoria.toLowerCase() === String(categoria).toLowerCase()
            )
        }

        if(situacao){
            partidasFiltradas = partidasFiltradas.filter(partida =>
                partida.situacao.toLowerCase() === String(situacao).toLowerCase()
            )
        }

        res.status(200).json(partidasFiltradas);


    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({erro: 'Dados de entrada invalidos'})
        }
    }
});

/*
    [5] GET - VISUALIZAR PERFIL JOGADOR - get//jogadores/{id_jogador}
    params: id_jogador
    response: 200, 400, 404
*/

const paramsSchemaListarJogador = z.object({
    id_jogador: z.string({message: "O id jogador é obrigatorio"}).min(1)
})

app.get('/jogadores/:id_jogador', (req: Request , res:Response) => {

    try {
        const {id_jogador} = paramsSchemaListarJogador.parse(req.params)
        const jogador = jogadoresBD.find(jog => jog.id_jogador === id_jogador)

        if(!jogador){
            res.status(404).json({erro: 'Jogador nao encontrado'})
        }

        res.status(200).json(jogador)

    } catch (error) {
        if(error instanceof ZodError){
            res.status(400).json({erro: 'Dados de entrada invalidos'})
        }
    }
});

/*
    [6] GET - LISTAR SOLICITACOES - get/partidas/{id_partida}/solicitacoes
    params: id_partida
    response: 200, 404
*/



// INICIALIZANDO...
app.get('/', (req: Request, res: Response) => {
    res.send("API funcionando!...")
});

app.listen(PORTA, () => {
    console.log(`💫 Porta rodando em http://localhost:${PORTA}`);
});