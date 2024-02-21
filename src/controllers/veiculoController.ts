import { Request, Response } from 'express';
import { Veiculo } from '../models/veiculo';
import { VeiculoService } from '../services/veiculoService';
import { veiculoModel } from '../models/veiculo2';

export class VeiculoController {

    private veiculoService: VeiculoService;

    constructor() {
        this.veiculoService = new VeiculoService();
    }
    buscarVeiculos() {
        return this.veiculoService.buscarVeiculos()
    }

    async adicionarVeiculo(req: Request) {
        await veiculoModel.create({
            placa: req.body.placa,
            tipoVeiculo: req.body.tipoVeiculo,
            valorHora: req.body.valorHora,
            modelo: req.body.modelo
          })
        // const novoVeiculo = new Veiculo(req.body);
    }

    listarVeiculosDisponiveis() {
        return this.veiculoService.listarVeiculosDisponiveis();
    }

}