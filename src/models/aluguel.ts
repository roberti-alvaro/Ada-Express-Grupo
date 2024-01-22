import { Cliente } from "./cliente"
import { IdGenerator } from "../uteis/IdGenerator";
import { Veiculo } from "./veiculo"

const fs = require("fs");

export class Aluguel {
    private _cpfCliente: string
    private _placaVeiculo: string
    private _nomeCliente: string
    private _tipoCarteiraCliente: string
    private _dataInicio: Date
    private _dataFim: Date
    private _numeroDaReserva: number | undefined;

    constructor(novoAluguel: TAluguel) {
        this._cpfCliente = novoAluguel.cpfCliente
        this._placaVeiculo = novoAluguel.placaVeiculo
        this._nomeCliente = novoAluguel.nomeCliente
        this._tipoCarteiraCliente = novoAluguel.tipoCarteiraCliente
        this._dataInicio = novoAluguel.dataInicio
        this._dataFim = novoAluguel.dataFim

    }

    static buscarAlugueis(): Array<TAluguel> {
        return JSON.parse(fs.readFileSync("./src/dados/alugueis.json", "utf-8"))
    }

    static buscarAluguelPorNumeroDaReserva(numeroDaReserva: number): TAluguel | undefined {
        const alugueis = Aluguel.buscarAlugueis();
        return alugueis.find(aluguel => aluguel.numeroDaReserva === numeroDaReserva)
    }
    static buscarAluguelPorCpf(cpf: string): TAluguel | undefined {
        const alugueis = Aluguel.buscarAlugueis();
        return alugueis.find(aluguel => aluguel.cpfCliente === cpf)
    }

    static alugarVeiculo(cpfCliente: string, placaVeiculo: string, nomeCliente: string, tipoCarteiraCliente: string, dataInicio: Date, dataFim: Date): void {
        const veiculo = Veiculo.buscarVeiculoPorPlaca(placaVeiculo);
        const cliente = Cliente.buscarClientePorCpf(cpfCliente);
        const alugueis = Aluguel.buscarAlugueis();

        if (veiculo?.reservadoPor === null && cliente?.veiculoAlugado === null) {
            if ((cliente.tipoCarteira === "A" && veiculo.tipoVeiculo === "moto") ||
                (cliente.tipoCarteira === "B" && veiculo.tipoVeiculo === "carro")) {

                alugueis.push({
                    cpfCliente: cpfCliente,
                    placaVeiculo: placaVeiculo,
                    nomeCliente: nomeCliente,
                    tipoCarteiraCliente: tipoCarteiraCliente,
                    dataInicio: dataInicio,
                    dataFim: dataFim,
                    numeroDaReserva: IdGenerator.getInstance().getNextId()
                })
                fs.writeFileSync("./src/dados/alugueis.json", JSON.stringify(alugueis))

                Aluguel.registrarReserva(placaVeiculo, cpfCliente);

                console.log("Reserva concluída!")
            } else {
                console.error("Sua carteira não permite este tipo de veículo!")
            }
        } else {
            console.error("Veículo já alugado ou cliente com pendência! ")
        }
    }

    static registrarReserva(placaVeiculo: string, cpfCliente: string): void {
        const veiculo = Veiculo.buscarVeiculoPorPlaca(placaVeiculo);
        const cliente = Cliente.buscarClientePorCpf(cpfCliente);

        const veiculos = Veiculo.buscarVeiculos();
        const indexVeiculo = veiculos.findIndex(veiculo => veiculo.placa === placaVeiculo)
        const clientes = Cliente.buscarCliente();
        const indexCliente = clientes.findIndex(cliente => cliente.cpf === cpfCliente)

        veiculos[indexVeiculo].reservadoPor = cpfCliente;
        fs.writeFileSync("./src/dados/veiculos.json", JSON.stringify(veiculos))

        clientes[indexCliente].veiculoAlugado = placaVeiculo;
        fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes))
    }

    static devolverVeiculo(placaVeiculo: string, cpfCliente: string) {
        const veiculos = Veiculo.buscarVeiculos();
        const indexVeiculo = veiculos.findIndex(veiculo => veiculo.placa === placaVeiculo)
        const clientes = Cliente.buscarCliente();
        const indexCliente = clientes.findIndex(cliente => cliente.cpf === cpfCliente)
        const veiculo = Veiculo.buscarVeiculoPorPlaca(placaVeiculo)
        const cliente = Cliente.buscarClientePorCpf(cpfCliente)
        
        if(veiculo && cliente) {
            veiculo.reservadoPor = null
            veiculos.splice(indexVeiculo, 1, veiculo)
            fs.writeFileSync("./src/dados/veiculos.json", JSON.stringify(veiculos))
            cliente.veiculoAlugado = null
            clientes.splice(indexCliente, 1, cliente)
            fs.writeFileSync("./src/dados/clientes.json", JSON.stringify(clientes))

            console.log('Operação concluída!');
            
        } else {
            console.error('Veiculo e/ou cliente não existe.');
        }
        
    }

     static faturamento(cpf : string) {
        const aluguel = this.buscarAluguelPorCpf(cpf)
        
        if(aluguel) {
            const veiculo = Veiculo.buscarVeiculoPorPlaca(aluguel.placaVeiculo)
            if(veiculo) {
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