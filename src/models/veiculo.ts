export class Veiculo {
    placa: string
    reservadoPor: string | null = null
    valorHora: number
    tipoVeiculo: string
    modelo: string

    constructor(novoVeiculo: TVeiculo) {
        this.valorHora = novoVeiculo.valorHora
        this.placa = novoVeiculo.placa
        this.tipoVeiculo = novoVeiculo.tipoVeiculo
        this.modelo = novoVeiculo.modelo
    }

}