'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('cliente', {
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      tipoCarteira: {
        type: Sequelize.STRING(1),
        allowNull: false
      },
      veiculoAlugado: {
        type: Sequelize.STRING(9),
        allowNull: true
      }

    });

  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('cliente');
  }
};
