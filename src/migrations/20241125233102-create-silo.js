'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('silos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      capacidade_total: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      capacidade_atual: {
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0,
      },
      cliente_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      updated_by: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'usuarios',
          key: 'id',
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('silos');
  },
};
