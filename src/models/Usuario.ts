import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import bcrypt from 'bcryptjs';

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

    // Método para comparar a senha fornecida com a senha armazenada (em formato hash)
    public static async comparePassword(candidatePassword: string, hashedPassword: string): Promise<boolean> {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }
}

// Hook para criptografar a senha antes de criar ou atualizar o usuário
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
        hooks: {
            beforeCreate: async (usuario: Usuario) => {
                if (usuario.senha) {
                    // Criptografa a senha antes de salvar no banco
                    usuario.senha = await bcrypt.hash(usuario.senha, 10); // 10 é o número de salt rounds
                }
            },
            beforeUpdate: async (usuario: Usuario) => {
                if (usuario.senha) {
                    // Criptografa a senha antes de salvar no banco
                    usuario.senha = await bcrypt.hash(usuario.senha, 10); // 10 é o número de salt rounds
                }
            }
        }
    }
);

export default Usuario;
