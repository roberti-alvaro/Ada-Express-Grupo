export class Aluguel {
    cpfCliente: string
    placaVeiculo: string
    dataInicio: Date
    dataFim: Date
    numeroDaReserva: number | undefined;

    constructor(novoAluguel: TAluguel) {
        this.cpfCliente = novoAluguel.cpfCliente
        this.placaVeiculo = novoAluguel.placaVeiculo
        this.dataInicio = novoAluguel.dataInicio
        this.dataFim = novoAluguel.dataFim

    }
}