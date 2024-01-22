type TCliente = {
    cpf: string
    nome: string
    tipoCarteira: string
    veiculoAlugado?: string | null
}

type TVeiculo = {
    placa: string
    valorHora: number
    tipoVeiculo: string
    modelo: string
    reservadoPor?: string | null
}

type TAluguel = {
    cpfCliente: string
    placaVeiculo: string
    nomeCliente: string
    tipoCarteiraCliente: string
    dataInicio: Date
    dataFim: Date
    numeroDaReserva?: number
}