import { Request, Response, NextFunction } from 'express';

const validarDadosEntrada = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { placa, tipoVeiculo, valorHora, modelo, reservadoPor } = req.body;


  if (
    placa === undefined ||
    tipoVeiculo === undefined ||
    valorHora === undefined ||
    modelo === undefined
  ) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
  }


  if (
    typeof placa !== 'string' ||
    typeof tipoVeiculo !== 'string' ||
    typeof valorHora !== 'number' ||
    typeof modelo !== 'string'
  ) {
    return res.status(400).json({ error: 'Formato inválido para um ou mais campos' });
  }

  
  next();
};

export {validarDadosEntrada};