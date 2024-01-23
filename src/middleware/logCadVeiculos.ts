import { NextFunction, Request, Response } from "express";
import { veiculoService } from "../services/veiculoService";
const fs = require('fs')

class LogCadVeiculosMiddleware {
  static DATE_FORMATTER = Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short'
  });

  execute(req: Request, res: Response, next: NextFunction) {
    const logCadVeiculos = JSON.parse(fs.readFileSync("./src/dados/logCadVeiculos.json", "utf-8"))
    const data = LogCadVeiculosMiddleware.DATE_FORMATTER.format(new Date())
    const veiculo = req.body

    if (veiculoService.buscarVeiculoPorPlaca(veiculo.placa)) {
        next()
        return;
    }

    logCadVeiculos.push({
        dataCadastroVeiculo: data, ...veiculo
    })

    fs.writeFileSync("./src/dados/logCadVeiculos.json", JSON.stringify(logCadVeiculos))
    next();
  }
}

const logCadVeiculosMiddleware = new LogCadVeiculosMiddleware();

export { logCadVeiculosMiddleware };