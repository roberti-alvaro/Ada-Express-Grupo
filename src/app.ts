import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import { Veiculo } from './models/veiculo'
import { Cliente } from './models/cliente';
import { logCadVeiculosMiddleware } from './middleware/logCadVeiculos'
import { validarDadosEntrada } from './middleware/validacao';

const fs = require("fs");

const app = express()

app.use(express.json())

app.get('/veiculos', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve('./src/dados/veiculos.json'))
})

app.use(logCadVeiculosMiddleware.execute)

app.post('/veiculos', validarDadosEntrada, (req: Request, res: Response, next: NextFunction) => {

    const veiculo = req.body

    if (Object.keys(veiculo).length !== 0) {
        const newVeiculo = new Veiculo(veiculo)

        newVeiculo.adicionarVeiculo()

        res.status(201).send(veiculo);
        return next();
    }

    return console.log('Deu errado o cadastro');

})

app.get('/clientes', (req: Request, res: Response, next: NextFunction) => {
    res.sendFile(path.resolve('./src/dados/clientes.json'))
})

app.post('/clientes', (req: Request, res: Response, next: NextFunction) => {
    const cliente = req.body

    const newCliente = new Cliente(cliente)

    newCliente.adicionarCliente()

    res.status(201).send(cliente);
    next();
})


app.listen(3000, () => {
    console.log('Servidor iniciado...');
})