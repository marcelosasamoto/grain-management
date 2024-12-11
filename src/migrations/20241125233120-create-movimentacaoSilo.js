'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('movimentacoes_silo', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      tipo: {
        type: Sequelize.ENUM('Entrada', 'Saida'),
        allowNull: false,
      },
      quantidade: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      silo_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'silos',
          key: 'id',
        },
        onDelete: 'CASCADE',
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
      created_by: {
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
    await queryInterface.dropTable('movimentacoes_silo');
  },
};
