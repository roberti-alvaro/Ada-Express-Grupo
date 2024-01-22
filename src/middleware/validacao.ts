// import { NextFunction, Request, Response } from "express";
// import { Veiculo } from "../models/veiculo";
// import { Cliente } from "../models/cliente";

// interface veiculo {
//     "placa": string,
//     "tipoVeiculo": string,
//     "valorHora": number,
//     "modelo": string,
//     "reservadoPor": null | string
// }


// class Validacao {
//     execute(req: Request, res: Response, next: NextFunction) {
//         const corpo = req.body

//         if(corpo === null || Object.keys(corpo).length === 0 ) {
//             console.error('Informações não encontradas.')
//             next()
//         }

//         if(corpo instanceof Veiculo) {
//             console.log('deu certo')
//             next()
//         }

//         if(corpo instanceof Cliente) {
//             console.log('deu certo 2')
//             next()
//         }
    
//     }
// }

// const validacao = new Validacao()

// export { validacao }

import { Request, Response, NextFunction } from 'express';

const validarDadosEntrada = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placa, tipoVeiculo, valorHora, modelo, reservadoPor } = req.body;

  // Verifica se todos os campos necessários estão presentes
  if (
    placa === undefined ||
    tipoVeiculo === undefined ||
    valorHora === undefined ||
    modelo === undefined ||
    reservadoPor === undefined
  ) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }

  // Verifica os tipos dos campos
  if (
    typeof placa !== 'string' ||
    typeof tipoVeiculo !== 'string' ||
    typeof valorHora !== 'number' ||
    typeof modelo !== 'string' ||
    (reservadoPor !== null && typeof reservadoPor !== 'string')
  ) {
    return res.status(400).json({ error: 'Formato inválido para um ou mais campos' });
  }

  // Se chegou até aqui, os dados são válidos
  next();
};

export {validarDadosEntrada};