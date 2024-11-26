'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Inserir os dados de Clientes primeiro
    const clientes = await queryInterface.bulkInsert('Clientes', [{
      id: 'f5a3f22e-8f94-4f34-8e3a-12b4f8bfa1b5', // ID fixo ou gerado automaticamente
      nome: 'Elton Mark',
      tipo_documento: 'Fisica',
      numero_documento: '1123456789',
      createdAt: new Date(),
      updatedAt: new Date(),
    }], { returning: true }); // Retorna os dados inseridos

    // Pegar o id do Cliente inserido
    const clienteId = clientes[0].id;

    // Inserir os dados dos Usuarios, associando ao clienteId
    await queryInterface.bulkInsert('Usuarios', [{
      id: 'f5a3f22e-8f94-4f34-8e3a-12b4f8bfa1b6',
      nome: 'Maria Doe',
      email: 'mariadoe@example.com',
      senha: 'senha123', // A senha deve ser criptografada, isso é só um exemplo
      nivel_acesso: 'Administrador',
      clienteId: clienteId, // Chave estrangeira associando ao Cliente
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});
  },

  down: async (queryInterface, Sequelize) => {
    // Reverter a inserção de 'Usuarios'
    //await queryInterface.bulkDelete('Usuarios', null, {});

    // Reverter a inserção de 'Clientes'
    //await queryInterface.bulkDelete('Clientes', null, {});
  }
};
