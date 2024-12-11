'use strict';
const bcryptjs = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir os dados de Clientes primeiro
    const clientes = await queryInterface.bulkInsert('clientes', [{
      id: 'f5a3f22e-8f94-4f34-8e3a-12b4f8bfa1b5', // ID fixo ou gerado automaticamente
      nome: 'John Doe',
      tipo_documento: 'Fisica',
      numero_documento: '1123456789',
      created_at: new Date(),
      updated_at: new Date(),
    }], { returning: true }); // Retorna os dados inseridos

    // Pegar o id do Cliente inserido
    const cliente_id = clientes[0].id;

    // Inserir os dados dos Usuarios, associando ao cliente_id
    await queryInterface.bulkInsert('usuarios', [{
      id: 'f5a3f22e-8f94-4f34-8e3a-12b4f8bfa1b6',
      nome: 'Marcelo Sasamoto',
      email: 'marcelo.y.sasamoto@hotmail.com',
      senha: await bcryptjs.hash('12345', 10),
      nivel_acesso: 'Administrador',
      cliente_id: cliente_id, // Chave estrangeira associando ao Cliente
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Reverter a inserção de 'Usuarios'
    //await queryInterface.bulkDelete('usuarios', null, {});

    // Reverter a inserção de 'Clientes'
    //await queryInterface.bulkDelete('clientes', null, {});
  }
};
