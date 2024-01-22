const fs = require("fs");

export class Cliente {
    private _cpf: string
    private _nome: string
    private _tipoCarteira: string
    private _veiculoAlugado: string | null = null

    constructor(novoCliente: TCliente) {
        this._cpf = novoCliente.cpf
        this._nome = novoCliente.nome
        this._tipoCarteira = novoCliente.tipoCarteira

    }


    static buscarCliente(): Array<TCliente> {
        return JSON.parse(fs.readFileSync("./src/dados/clientes.json", "utf-8"))
    }
    
    static buscarClientePorCpf(cpf: string): TCliente | undefined {
        const clientes = Cliente.buscarCliente();
        const cliente = clientes.find(cliente => cliente.cpf === cpf)
        if(cliente) {
            return cliente 
        }
    }

    adicionarCliente(): void {
        const clientes = Cliente.buscarCliente();

        if (Cliente.buscarClientePorCpf(this._cpf)) {
            console.error("CPF já cadastrado! ")
            return;
        }

        clientes.push({
            cpf: this._cpf,
            nome: this._nome,
            tipoCarteira: this._tipoCarteira,
            veiculoAlugado: this._veiculoAlugado
        })
        fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes))
    }


}