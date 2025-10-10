// CONFIGURACAO DO SERVIDOR

import express from "express";
import type {Request, Response} from "express";
import {router} from './presentation/routes/index.routes.js';


// CONFIGURACAO

const app = express();
const PORTA = 3000;

// para express entender que usaremos json no corpo das req
app.use(express.json());

// Arrays para simular banco de dados


// const solicitacoesBD: Solicitacao[] = [];
// const participantesBD: Participante[] = [];

// // --- ESPECIFICACAO DAS ROTAS E ESQUEMAS DE VALIDACAO COM ZOD ---


// /*
//     [2] POST - CRIAR PARTIDA - post/partidas
//     body: id_organi, nome, local, data_hora, categoria, total_vagas, preco_por_jogador
//     response: 201, 400 
// */





/*
    [3] POST - CRIAR SOLICITACAO - post/partidas/{id_partida}/solicitacoes
    params: id partida
    body: id_jogador
    response: 201, 400 
*/


// app.post('/partidas/:id_partida/solicitacoes', (req: Request , res: Response) => {

//     try {
//         const {id_partida} = paramsSchemaCriarSolicitacao.parse(req.params);

//         const bodySolicitacao = criarSolicitacaoSchema.parse(req.body); //id jogador

//         const novaSolicitacao : Solicitacao = {
//             id_solicitacao: gerarId(),
//             id_partida,
//             id_jogador: bodySolicitacao.id_jogador,
//             status: 'pendente',
//             data_criacao: new Date()
//         }
//         solicitacoesBD.push(novaSolicitacao);

//         res.status(201).json(novaSolicitacao);

//     } catch (error){
//         if(error instanceof ZodError) {
//             res.status(400).json({erro: 'Dados de entrada invalidos'})
//         }
//     }
// })





// /*
//     [6] GET - LISTAR SOLICITACOES - get/partidas/{id_partida}/solicitacoes
//     params: id_partida
//     response: 200, 404, 400
// */


// app.get('/partidas/:id_partida/solicitacoes',(req: Request, res: Response) => {
    
//     try {
//         const {id_partida} = paramsSchemaListarSolicitacoes.parse(req.params);
//         const solicitacoesPartida = solicitacoesBD.filter(sol => sol.id_partida === id_partida)

//         if(solicitacoesPartida.length === 0){
//             res.status(404).json({erro: 'Nenhuma solicitacao encontrada para essa partida'})
//         }

//         res.status(200).json(solicitacoesPartida)

//     } catch (error) {
//         if(error instanceof ZodError){
//             res.status(400).json({erro: 'Dados de entrada invalidos'})
//         }
//     }
// });


// /*
//     [7] GET - LISTAR PARTICIPANTES - get/partidas/{id_partida}/participantes
//     params: id_partida
//     response:  200,404,400
// */

// const paramsSchemaListarParticipantes = z.object({
//     id_partida: z.string({message: 'O id da partida é obrigatorio'}).min(1)
// })

// app.get('/partidas/:id_partida/participantes', (req: Request, res: Response) => {
//     try {
//         const {id_partida} = paramsSchemaListarParticipantes.parse(req.params);
//         const participantesPartida = participantesBD.filter(part => part.id_partida === id_partida)

//         if(participantesPartida.length === 0){
//             res.status(404).json({erro: 'Nenhum participante encontrado para essa partida'})
//         }

//         res.status(200).json(participantesPartida)
//     } catch (error) {
//         if(error instanceof ZodError){
//             res.status(400).json({erro: 'Dados de entrada invalidos'})
//         }
//     }
// })

// /*
//     [8] PATCH - CANCELAR/ACEITAR SOLICITACAO - patch/partidas/{id_partida}/solicitacoes/{id_solicitacao}
//     body: status
//     params: id_partida, id_solicitacao
//     response:  200,404,400
// */


// app.patch('/partidas/:id_partida/solicitacoes/:id_solicitacao', (req: Request, res: Response) => {
//     try {
//         const {id_partida, id_solicitacao} = paramsSchemaAlterarSolicitacao.parse(req.params);
//         const solicitacao = solicitacoesBD.find(sol => sol.id_solicitacao === id_solicitacao && sol.id_partida === id_partida)

//         if(!solicitacao){
//             res.status(404).json({erro: 'Solicitacao nao encontrada para essa partida'});
//             return
//         }

//         const {status} = bodySchemaAlterarSolicitacao.parse(req.body);

//         if(solicitacao.status === 'aceita' || solicitacao.status === 'recusada'){
//             return res.status(404).json({erro: `A solicitacao já foi ${status}`});
//         }

//         if(status === 'aceita'){
//             const partida = partidasBD.find(p => p.id_partida === id_partida);
//             if (!partida) {
//                 return res.status(404).json({ erro: 'Partida associada não foi encontrada.' });
//             }

//             const novaParticipante: Participante = {
//                 id_participante: gerarId(),
//                 id_partida: id_partida,
//                 id_jogador : solicitacao?.id_jogador,
//                 data_confirmacao: String(new Date()),
//                 preco_pagamento: partidasBD.find(partida => partida.id_partida === id_partida)?.preco_por_jogador || 0,
//                 status_pagamento: 'pendente'
//             }
//             participantesBD.push(novaParticipante);
//         }

//         // para ambos casos
//         solicitacao.status = status;
//         res.status(200).json({solicitacao})

//     } catch (error) {
//         if(error instanceof ZodError){
//             res.status(400).json({erro: 'Dados de entrada invalidos'})
//         }
//     }
// })

/*
    [9] PATCH - ATUALIZAR PARTIDA - patch/partidas/{id_partida}
    params: id_partida
    response:  200,404,400
*/


// /*
//     [10] PATCH - DESISTIR PARTIDA - delete/partidas/{id_partida}/participantes/{id_jogador}
//     params: id_partida, id_jogador
//     response:  200,404,400
// */

// app.delete('/partidas/:id_partida/participantes/:id_jogador', (req: Request, res: Response) => {
//     try {
//         const {id_partida, id_jogador} = paramsSchemaDesistirPartida.parse(req.params);
//         const indexParticipante = participantesBD.findIndex(part => part.id_partida === id_partida && part.id_jogador === id_jogador)

//         if(indexParticipante === -1){
//             res.status(404).json({erro: 'Participante nao encontrado para essa partida'})
//         }
//         participantesBD.splice(indexParticipante, 1);
//         res.status(200).json({message: 'Participante removido com sucesso'})
//     }catch (error) {
//         if(error instanceof ZodError){
//             res.status(400).json({erro: 'Dados de entrada invalidos'})
//         }
//     }
// })

// ADICIONAR ROTEADORES
app.use(router)

// INICIALIZANDO...
app.get('/', (req: Request, res: Response) => {
    res.send("✨ API funcionando!...")
});

app.listen(PORTA, () => {
    console.log(`💫 Porta rodando em http://localhost:${PORTA}`);
});