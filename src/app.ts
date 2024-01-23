import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import { logCadVeiculosMiddleware } from './middleware/logCadVeiculos'
import { validarDadosEntrada } from './middleware/validacao';
import { VeiculoController } from './controllers/veiculoController';
import { ClienteController } from './controllers/clienteController';
import { AluguelController } from './controllers/aluguelController';

const app = express()

app.use(express.json())

app.get('/veiculos', (req: Request, res: Response, next: NextFunction) => {
    const veiculosDisponiveis = new VeiculoController().listarVeiculosDisponiveis();
    res.status(200).send(veiculosDisponiveis);
    return next();
})

app.use(logCadVeiculosMiddleware.execute)

app.post('/veiculos', validarDadosEntrada, (req: Request, res: Response, next: NextFunction) => {
    const veiculoCriado = new VeiculoController().adicionarVeiculo(req);
    res.status(201).send(veiculoCriado);
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