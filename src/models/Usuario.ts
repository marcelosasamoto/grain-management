import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface UsuarioAttributes {
    id: string;
    nome: string;
    email: string;
    senha: string;
    nivel_acesso: 'Administrador' | 'Gerente' | 'Basico';
    clienteId: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UsuarioInterface extends Optional<UsuarioAttributes, 'id'> { }

export class Usuario extends Model<UsuarioAttributes, UsuarioInterface> implements UsuarioAttributes {
    public id!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public nivel_acesso!: 'Administrador' | 'Gerente' | 'Basico';
    public clienteId!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Usuario.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,  // Gerar UUID automaticamente
            primaryKey: true,
        },

        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nivel_acesso: {
            type: DataTypes.ENUM('Administrador', 'Gerente', 'Basico'),
            allowNull: false,
        },
        clienteId: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'Usuarios',
    }
);

export default Usuario;
