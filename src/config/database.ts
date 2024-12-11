import { Sequelize } from 'sequelize';
import pg from 'pg';


const DB_URI = process.env.DB_URI
if (!DB_URI) {
    throw new Error("Token de autenticação inválido ou ausente");
}
const sequelize = new Sequelize(DB_URI,
    {
        dialect: 'postgres',
        dialectModule: pg
    }
) // Example for postgres



export default sequelize;
