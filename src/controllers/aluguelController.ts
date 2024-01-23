import { Request } from 'express';
import { AluguelService } from "../services/aluguelService";
import { Aluguel } from '../models/aluguel';

export class AluguelController {

    private aluguelService: AluguelService;

    constructor() {
        this.aluguelService = new AluguelService();
    }

    alugarVeiculo(req: Request) {
        const novoAluguel = new Aluguel(req.body);
        return this.aluguelService.alugarVeiculo(novoAluguel);
    }

    // devolverVeiculo()

    // listarAlugueis()
}