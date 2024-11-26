'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clientes', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4, // Gerar UUID automaticamente
        allowNull:false,
        primaryKey: true,
      },
      nome: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_documento: {
        type: Sequelize.ENUM('Fisica', 'Juridica', 'Estrangeiro', 'Outro'),
        allowNull: false,
      },
      numero_documento: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remover a tabela
    await queryInterface.dropTable('Clientes');

    // Remover o ENUM criado
    await queryInterface.sequelize.query('DROP TYPE IF EXISTS "enum_clientes_tipo_documento";');
  },
};
