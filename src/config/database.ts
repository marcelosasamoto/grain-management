import { Sequelize } from 'sequelize';
import sqlite3 from 'sqlite3'; // Certifique-se de importar o sqlite3 corretamente

// Carregar variáveis de ambiente do arquivo .env

console.log('sequelize db', process.env.DB_NAME)
const sequelize = new Sequelize(
    process.env.DB_NAME || 'database_name',
    process.env.DB_USER || 'username',
    process.env.DB_PASSWORD || 'password',

    {
        dialect: 'sqlite',
        storage: 'db.sqlite', // O caminho deve ser relativo ao diretório onde o processo Node.js está sendo executado
        dialectModule: sqlite3,
        logging: false, // Desativa os logs
    }
);

export default sequelize;
