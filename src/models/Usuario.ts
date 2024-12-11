import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

interface UsuarioAttributes {
    id: string;
    nome: string;
    email: string;
    senha: string;
    nivel_acesso: 'Root' | 'Administrador' | 'Gerente' | 'Basico';
    cliente_id: string;
    created_at?: Date;
    updated_at?: Date;
}

export interface UsuarioInterface extends Optional<UsuarioAttributes, 'id'> {}

export class Usuario extends Model<UsuarioAttributes, UsuarioInterface> implements UsuarioAttributes {
    public id!: string;
    public nome!: string;
    public email!: string;
    public senha!: string;
    public nivel_acesso!: 'Root' | 'Administrador' | 'Gerente' | 'Basico';
    public cliente_id!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;

    // Método para comparar senha fornecida com a armazenada
    public static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}

Usuario.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
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
            validate: {
                isEmail: true, // Valida formato de email
            },
        },
        senha: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nivel_acesso: {
            type: DataTypes.ENUM('Root', 'Administrador', 'Gerente', 'Basico'),
            allowNull: false,
        },
        cliente_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
    },
    {
        sequelize,
        tableName: 'usuarios',
        timestamps: true,
        underscored: true,
        hooks: {
            beforeCreate: async (usuario: Usuario) => {
                if (usuario.senha) {
                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                }
            },
            beforeUpdate: async (usuario: Usuario) => {
                if (usuario.changed('senha')) { // Apenas recria o hash se a senha foi alterada
                    usuario.senha = await bcrypt.hash(usuario.senha, 10);
                }
            },
        },
    }
);

export default Usuario;
