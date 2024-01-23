const fs = require("fs");

export class VeiculoRepository {

    buscarVeiculos(): Array<TVeiculo> {
        return JSON.parse(fs.readFileSync("./src/dados/veiculos.json", "utf-8"));
    }

    adicionarVeiculo(veiculos: Array<TVeiculo>): void {
        fs.writeFileSync("./src/dados/veiculos.json", JSON.stringify(veiculos));
    }
    
    registrarReservaNoVeiculo(veiculos: Array<TVeiculo>) {
        fs.writeFileSync("./src/dados/veiculos.json", JSON.stringify(veiculos))
    }
}
