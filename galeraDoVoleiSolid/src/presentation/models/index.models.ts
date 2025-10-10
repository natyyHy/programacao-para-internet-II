
// Interfaces - estrutura dos objetos

export interface Jogador {
    id_jogador?: string,
    nome: string,
    categoria: string,
    sexo: string,
    data_nascimento: Date,
    organizador: boolean
};

export interface Partida {
    id_partida?: string,
    id_organizador: string,
    nome: string,
    local: string,
    data_hora: string,
    categoria: string,
    situacao?: 'em adesao' | 'cancelada' | 'confirmada',
    total_vagas: number,
    preco_por_jogador: number
};

export interface Solicitacao {
    id_solicitacao: string,
    id_partida: string,
    id_jogador: string,
    status: 'pendente' | 'aceita' | 'recusada',
    data_criacao: Date
};

export interface Participante {
    id_participante: string,
    id_partida: string,
    id_jogador: string,
    data_confirmacao: string,
    preco_pagamento: number,
    status_pagamento: 'pendente' | 'aceita' | 'recusada'
};
