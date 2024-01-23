import { IdGenerator } from "../uteis/IdGenerator";
import { AluguelRepository } from "../repositories/aluguelRepository";
import { ClienteService } from "./clienteService";
import { VeiculoService } from "./veiculoService";
import { ClienteRepository } from "../repositories/clienteRepository";

export class AluguelService {

    private aluguelRepository: AluguelRepository;
    private veiculoService: VeiculoService;
    private clienteService: ClienteService;

    constructor() {
        this.aluguelRepository = new AluguelRepository();
        this.veiculoService = new VeiculoService();
        this.clienteService = new ClienteService();
    }

    buscarAlugueis() {
        return this.aluguelRepository.buscarAlugueis();
    }

    buscarAluguelPorNumeroDaReserva(numeroDaReserva: number): TAluguel | undefined {
        const alugueis = this.buscarAlugueis();
        return alugueis.find(aluguel => aluguel.numeroDaReserva === numeroDaReserva)
    }
    buscarAluguelPorCpf(cpf: string): TAluguel | undefined {
        const alugueis = this.buscarAlugueis();
        return alugueis.find(aluguel => aluguel.cpfCliente === cpf)
    }

    alugarVeiculo(aluguel: TAluguel): void {
        const veiculo = this.veiculoService.buscarVeiculoPorPlaca(aluguel.placaVeiculo);
        const cliente = this.clienteService.buscarClientePorCpf(aluguel.cpfCliente);
        const alugueis = this.buscarAlugueis();

        if (veiculo?.reservadoPor === null && cliente?.veiculoAlugado === null) {
            if ((cliente.tipoCarteira === "A" && veiculo.tipoVeiculo === "moto") ||
                (cliente.tipoCarteira === "B" && veiculo.tipoVeiculo === "carro")) {

                alugueis.push({
                    cpfCliente: aluguel.cpfCliente,
                    placaVeiculo: aluguel.placaVeiculo,
                    dataInicio: aluguel.dataInicio,
                    dataFim: aluguel.dataFim,
                    numeroDaReserva: IdGenerator.getInstance().getNextId()
                })

                this.aluguelRepository.alugarVeiculo(alugueis);

                this.registrarReserva(aluguel.placaVeiculo, aluguel.cpfCliente);

                console.log("Reserva concluída!")
            } else {
                throw new Error("Sua carteira não permite este tipo de veículo!");
            }
        } else {
            throw new Error("Veículo já alugado ou cliente com pendência!");
        }
    }

    registrarReserva(placaVeiculo: string, cpfCliente: string): void {
        const veiculo = this.veiculoService.buscarVeiculoPorPlaca(placaVeiculo);
        const cliente = this.clienteService.buscarClientePorCpf(cpfCliente);

        const veiculos = this.veiculoService.buscarVeiculos();
        const indexVeiculo = veiculos.findIndex(veiculo => veiculo.placa === placaVeiculo)
        const clientes = this.clienteService.buscarClientes();
        const indexCliente = clientes.findIndex(cliente => cliente.cpf === cpfCliente)

        veiculos[indexVeiculo].reservadoPor = cpfCliente;
        this.veiculoService.registrarReservaNoVeiculo(veiculos);

        clientes[indexCliente].veiculoAlugado = placaVeiculo;
        this.clienteService.registrarReservaNoCliente(clientes);
    }

    listarAlugueis(): Array<TAluguel> {
        return this.buscarAlugueis();
    }

    devolverVeiculo(placaVeiculo: string, cpfCliente: string) {
        const veiculos = this.veiculoService.buscarVeiculos();
        const indexVeiculo = veiculos.findIndex(veiculo => veiculo.placa === placaVeiculo)
        const clientes = this.clienteService.buscarClientes();
        const indexCliente = clientes.findIndex(cliente => cliente.cpf === cpfCliente)
        const veiculo = this.veiculoService.buscarVeiculoPorPlaca(placaVeiculo)
        const cliente = this.clienteService.buscarClientePorCpf(cpfCliente)

        if (veiculo && cliente) {
            veiculo.reservadoPor = null
            veiculos.splice(indexVeiculo, 1, veiculo)
            this.veiculoService.registrarDevolucaoNoVeiculo(veiculos)
            cliente.veiculoAlugado = null
            clientes.splice(indexCliente, 1, cliente)
            this.clienteService.registrarDevolucaoNoCliente(clientes)

            console.log('Operação concluída!');

        } else {
            throw new Error('Veiculo e/ou cliente não existe.');
        }

    }

    faturamento(cpf: string) {
        const aluguel = this.buscarAluguelPorCpf(cpf)

        if (aluguel) {
            const veiculo = this.veiculoService.buscarVeiculoPorPlaca(aluguel.placaVeiculo)
            if (veiculo) {
                const valor = veiculo?.valorHora
                const dtInicio = new Date(aluguel.dataInicio)
                const dataFim = new Date(aluguel.dataFim)
                const horasAlugadas = Math.floor(((dataFim.getTime() - dtInicio.getTime()) / (1000 * 60 * 60)));
                const acresceCarro = 1.1;
                const acresceMoto = 1.05;
                let valorTotal = 0;

                if (veiculo.tipoVeiculo === "moto") {
                    valorTotal = veiculo.valorHora * horasAlugadas * acresceMoto;
                } else if (veiculo.tipoVeiculo === "carro") {
                    valorTotal = veiculo.valorHora * horasAlugadas * acresceCarro;
                }

                console.log(`
        Número de horas alugadas: ${horasAlugadas}
        Valor da hora de aluguel: ${valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        Acréscimos:
                Moto = 5%
                Carro = 10%

    ************************************

        Valor total: ${valorTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
        `)

                return valorTotal
            }
        }

    }
}