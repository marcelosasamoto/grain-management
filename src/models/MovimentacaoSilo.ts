import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface MovimentacaoAttributes {
    id: number;
    tipo: 'Entrada' | 'Saida';
    quantidade: number;
    siloId: number;
    clienteId: string;
    createdBy: number; // ID do usuário que fez a movimentação
    createdAt?: Date;
}

interface MovimentacaoCreationAttributes extends Optional<MovimentacaoAttributes, 'id'> { }

class Movimentacao extends Model<MovimentacaoAttributes, MovimentacaoCreationAttributes> implements MovimentacaoAttributes {
    public id!: number;
    public tipo!: 'Entrada' | 'Saida';
    public quantidade!: number;
    public siloId!: number;
    public clienteId!: string;
    public createdBy!: number;
    public readonly createdAt!: Date;
}

Movimentacao.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('Entrada', 'Saida'),
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        siloId: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        clienteId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        createdBy: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        tableName: 'movimentacoes',
        timestamps: false,
    }
);

export default Movimentacao;
