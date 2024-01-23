import { Cliente } from "../models/cliente";
import { ClienteRepository } from "../repositories/clienteRepository";

export class ClienteService {

    private clienteRepository: ClienteRepository;

    constructor() {
        this.clienteRepository = new ClienteRepository();
    }

    buscarClientes() {
        return this.clienteRepository.buscarClientes();
    }

    buscarClientePorCpf(cpf: string): TCliente | undefined {
        const clientes = this.buscarClientes();
        const cliente = clientes.find(cliente => cliente.cpf === cpf)

        if (cliente) {
            return cliente
        }
    }

    adicionarCliente(novoCliente: Cliente): Cliente {
        const clientes = this.buscarClientes();

        if (this.buscarClientePorCpf(novoCliente.cpf)) {
            throw new Error("CPF já cadastrado! ");
        }

        clientes.push({
            cpf: novoCliente.cpf,
            nome: novoCliente.nome,
            tipoCarteira: novoCliente.tipoCarteira,
            veiculoAlugado: novoCliente.veiculoAlugado
        })

        this.clienteRepository.adicionarCliente(clientes);
        return novoCliente;
    }

    listarClientes(): Array<TCliente> {
        return this.buscarClientes();
    }

    registrarReservaNoCliente(clientes: Array<TCliente>) {
        this.clienteRepository.registrarReservaNoCliente(clientes)
    }

}