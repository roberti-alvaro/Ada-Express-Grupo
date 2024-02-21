import { DataTypes } from 'sequelize'
import { sequelize } from './../infra/db/sequelize/index'

const veiculoModel = sequelize.define('veiculo', {
    
      placa: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      tipoVeiculo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      valorHora: {
        type: DataTypes.FLOAT,
        allowNull: false
      },
      modelo: {
        type: DataTypes.STRING,
        allowNull: false
      },
      reservadoPor: {
        type: DataTypes.STRING,
        allowNull: true
      }
  }, 
  {
    timestamps: false,
    tableName: "veiculo"
  }
)

export { veiculoModel }