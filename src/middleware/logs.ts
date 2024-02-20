import { NextFunction, Request, Response } from "express";
const fs = require('fs')

class Logs {
  
  static DATE_FORMATTER = Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });
  
  execute(req: Request, res: Response, next: NextFunction) {
    
    const rota = req.baseUrl
    const metodo = req.method
    const data = Logs.DATE_FORMATTER.format(new Date())

    if (rota === "/veiculos" && metodo === "get") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))

        logs.push({
            ServicoUtilizado: "Listar Veiculos",
            Data: data,
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    }

    if (rota === "/veiculos" && metodo === "post") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))
        const veiculo = req.body

        logs.push({
            ServicoUtilizado: "Cadastrar Veiculo",
            Data: data,
            VeiculoCadastrado: veiculo
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    }

    if (rota === "/clientes" && metodo === "get") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))

        logs.push({
            ServicoUtilizado: "Listar Clientes",
            Data: data,
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    }

    if (rota === "/clientes" && metodo === "post") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))
        const cliente = req.body

        logs.push({
            ServicoUtilizado: "Cadastrar Veiculo",
            Data: data,
            VeiculoCadastrado: cliente
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    }

    if (rota === "/alugueis" && metodo === "get") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))

        logs.push({
            ServicoUtilizado: "Listar Alugueis",
            Data: data,
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    }

    if (rota === "/alugueis" && metodo === "post") {
        const logs = JSON.parse(fs.readFileSync("./src/dados/logs.json", "utf-8"))
        const alugueis = JSON.parse(fs.readFileSync("./src/dados/alugueis.json", "utf-8"))
        const numeroAluguel = alugueis[-1].numeroDaReserva


        logs.push({
            ServicoUtilizado: "Aluguel de Veiculo",
            Data: data,
            NumeroAluguel: numeroAluguel
        })
        fs.writeFileSync("./src/dados/logs.json", JSON.stringify(logs))
        return next();
    } next()}
}

const logsmiddleware = new Logs()

export { logsmiddleware }