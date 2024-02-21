import dotenv from "dotenv";
dotenv.config()
const cors = require('cors')
var morgan = require('morgan')
import helmet from "helmet";
import express, { NextFunction, Request, Response } from 'express'
import { logCadVeiculosMiddleware } from './middleware/logCadVeiculos'
import { validarDadosEntrada } from './middleware/validacao';
import { VeiculoController } from './controllers/veiculoController';
import { ClienteController } from './controllers/clienteController';
import { AluguelController } from './controllers/aluguelController';

const app = express()

app.use(express.json())

app.use(cors({
    origin: [
      'http://127.0.0.1:5501',
      'http://localhost:5501'
    ]
  }))

app.use(helmet())

app.use(morgan('[:date[clf]] ":method :url" :status :res[content-length]'));

app.get('/veiculos', (req: Request, res: Response, next: NextFunction) => {
    const veiculosDisponiveis = new VeiculoController().buscarVeiculos();
    res.status(200).send(veiculosDisponiveis);
    return next();
})

app.post('/veiculos', validarDadosEntrada, logCadVeiculosMiddleware.execute, (req: Request, res: Response, next: NextFunction) => {
    new VeiculoController().adicionarVeiculo(req);
    res.status(201).send();
    return next();
})

app.get('/clientes', (req: Request, res: Response, next: NextFunction) => {
    const clientes = new ClienteController().listarClientes();
    res.status(200).send(clientes);
    return next();
})

app.post('/clientes', (req: Request, res: Response, next: NextFunction) => {
    const clienteCriado = new ClienteController().adicionarCliente(req)
    res.status(201).send(clienteCriado);
    return next();
})

app.get('/alugueis', (req: Request, res: Response, next: NextFunction) => {
    const alugueis = new AluguelController().listarAlugueis();
    res.status(200).send(alugueis);
})

app.post('/alugueis', (req: Request, res: Response, next: NextFunction) => {
    const aluguelCriado = new AluguelController().alugarVeiculo(req);
    res.status(201).send(aluguelCriado);
})



app.listen(3000, () => {
    console.log('Servidor iniciado...');
})