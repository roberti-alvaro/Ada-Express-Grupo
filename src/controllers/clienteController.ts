import { Request } from 'express';
import { Cliente } from "../models/cliente";
import { ClienteService } from "../services/clienteService";


export class ClienteController {

    private clienteService: ClienteService;

    constructor() {
        this.clienteService = new ClienteService();
    }

    adicionarCliente(req: Request) {
        const novoCliente = new Cliente(req.body);

        return this.clienteService.adicionarCliente(novoCliente);
    }

    listarClientes() {
        return this.clienteService.listarClientes();
    }
}