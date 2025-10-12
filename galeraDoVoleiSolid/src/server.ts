// CONFIGURACAO DO SERVIDOR

import express from "express";
import type {Request, Response} from "express";
import {router} from './presentation/routes/index.routes.js';


// CONFIGURACAO

const app = express();
const PORTA = 3000;

// para express entender que usaremos json no corpo das req
app.use(express.json());



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



// ADICIONAR ROTEADORES
app.use(router)

// INICIALIZANDO...
app.get('/', (req: Request, res: Response) => {
    res.send("✨ API funcionando!...")
});

app.listen(PORTA, () => {
    console.log(`💫 Porta rodando em http://localhost:${PORTA}`);
});