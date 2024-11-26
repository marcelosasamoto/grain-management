'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Silos', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
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
        defaultValue: 0,
        allowNull: false,
      },
      clienteId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'Clientes',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      updatedBy: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Usuarios',
          key: 'id',
        },
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Silos');
  },
};
