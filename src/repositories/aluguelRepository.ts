const fs = require("fs");

export class AluguelRepository {

    buscarAlugueis(): Array<TAluguel> {
        return JSON.parse(fs.readFileSync("./src/dados/alugueis.json", "utf-8"))
    }

    alugarVeiculo(alugueis: Array<TAluguel>): void {
        fs.writeFileSync("./src/dados/alugueis.json", JSON.stringify(alugueis))
    }

}