export class Cliente {
    cpf: string
    nome: string
    tipoCarteira: string
    veiculoAlugado: string | null = null

    constructor(novoCliente: TCliente) {
        this.cpf = novoCliente.cpf
        this.nome = novoCliente.nome
        this.tipoCarteira = novoCliente.tipoCarteira

    }

}