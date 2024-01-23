import { Veiculo } from "../models/veiculo";
import { VeiculoRepository } from "../repositories/veiculoRepository";


export class VeiculoService {

    private veiculoRepository: VeiculoRepository;

    constructor() {
        this.veiculoRepository = new VeiculoRepository();
    }

    buscarVeiculos() {
        return this.veiculoRepository.buscarVeiculos();
    }

    buscarVeiculoPorPlaca(placa: string): TVeiculo | undefined {
        const veiculos = this.buscarVeiculos();
        const veiculo = veiculos.find(veiculo => veiculo.placa === placa)

        if (veiculo) {
            return veiculo
        }
    }

    adicionarVeiculo(novoVeiculo: Veiculo): Veiculo {
        const veiculos = this.buscarVeiculos();

        if (this.buscarVeiculoPorPlaca(novoVeiculo.placa)) {
            throw new Error("Placa já cadastrada!");
        }

        veiculos.push({
            placa: novoVeiculo.placa,
            tipoVeiculo: novoVeiculo.tipoVeiculo,
            valorHora: novoVeiculo.valorHora,
            modelo: novoVeiculo.modelo,
            reservadoPor: novoVeiculo.reservadoPor = null
        })

        this.veiculoRepository.adicionarVeiculo(veiculos)

        return novoVeiculo;
    }

    listarVeiculosDisponiveis(): Array<TVeiculo> {
        const veiculos: Array<TVeiculo> = this.buscarVeiculos();
        const veiculosDisponiveis = veiculos.filter(veiculo => veiculo.reservadoPor === null)

        return veiculosDisponiveis
    }

    registrarReservaNoVeiculo(veiculos: Array<TVeiculo>) {
        this.veiculoRepository.registrarReservaNoVeiculo(veiculos)
    }

    registrarDevolucaoNoVeiculo(veiculos: Array<TVeiculo>) {
        this.veiculoRepository.registrarDevolucaoNoVeiculo(veiculos)
    }

    // listarVeiculosAlugados(): Array<TVeiculo> {
    //     const veiculos: Array<TVeiculo> = this.veiculoRepository.buscarVeiculos();
    //     const veiculosAlugados = veiculos.filter(veiculo => veiculo.reservadoPor !== null)

    //     return veiculosAlugados
    // }

}

const veiculoService = new VeiculoService()

export { veiculoService }
