'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('veiculo', {
      placa: {
        type: Sequelize.STRING(9),
        allowNull: false,
        primaryKey: true
      },
      tipoVeiculo: {
        type: Sequelize.STRING(5),
        allowNull: false
      },
      valorHora: {
        type: Sequelize.FLOAT(10, 2),
        allowNull: false
      },
      modelo: {
        type: Sequelize.STRING(60),
        allowNull: false
      },
      reservadoPor: {
        type: Sequelize.STRING(11),
        allowNull: true
      }

    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('veiculo');
  }
};
