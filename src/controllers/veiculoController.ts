import { Request } from 'express';
import { Veiculo } from '../models/veiculo';
import { VeiculoService } from '../services/veiculoService';

export class VeiculoController {

    private veiculoService: VeiculoService;

    constructor() {
        this.veiculoService = new VeiculoService();
    }

    adicionarVeiculo(req: Request) {
        const novoVeiculo = new Veiculo(req.body);

        return this.veiculoService.adicionarVeiculo(novoVeiculo);
    }

    listarVeiculosDisponiveis() {
        return this.veiculoService.listarVeiculosDisponiveis();
    }

}
