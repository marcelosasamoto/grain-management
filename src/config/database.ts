import { Sequelize } from 'sequelize';
import pg from 'pg';


const sequelize = new Sequelize('postgres://postgres:senha123@localhost:5432/meubanco',
    {
        dialect: 'postgres',
        dialectModule: pg
    }
) // Example for postgres



export default sequelize;
