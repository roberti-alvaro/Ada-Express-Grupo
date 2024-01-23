const fs = require("fs");

export class ClienteRepository {

    buscarClientes(): Array<TCliente> {
        return JSON.parse(fs.readFileSync("./src/dados/clientes.json", "utf-8"));
    }

    adicionarCliente(clientes: Array<TCliente>): void {
        fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes));
    }

    registrarReservaNoCliente(clientes: Array<TCliente>) {
        fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes))
    }

    registrarDevolucaoNoCliente(clientes: Array<TCliente>) {
        fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes))
    }
}