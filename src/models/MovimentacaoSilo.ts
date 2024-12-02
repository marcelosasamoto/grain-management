import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Silo from './Silo'; // Importe o modelo de Silo

interface MovimentacaoAttributes {
    id: number;
    tipo: 'Entrada' | 'Saida';
    quantidade: number;
    siloId: number;
    clienteId: string;
    createdBy: string; // ID do usuário que fez a movimentação
    createdAt?: Date;
}

export interface MovimentacaoSiloInterface extends Optional<MovimentacaoAttributes, 'id'> { }

export class Movimentacao extends Model<MovimentacaoAttributes, MovimentacaoSiloInterface> implements MovimentacaoAttributes {
    public id!: number;
    public tipo!: 'Entrada' | 'Saida';
    public quantidade!: number;
    public siloId!: number;
    public clienteId!: string;
    public createdBy!: string;
    public readonly createdAt!: Date;
}

Movimentacao.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        tipo: {
            type: DataTypes.ENUM('Entrada', 'Saida'),
            allowNull: false,
        },
        quantidade: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        siloId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        clienteId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Clientes',
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
                model: 'Usuarios',
                key: 'id',
            },
        }
    },
    {
        sequelize,
        tableName: 'MovimentacoesSilo',
        hooks: {
            afterCreate: async (movimentacao, options) => {
                // Encontre o silo correspondente
                const silo = await Silo.findByPk(movimentacao.siloId);

                if (!silo) {
                    throw new Error('Silo não encontrado');
                }

                // Atualiza a capacidade_atual baseado no tipo de movimentação
                if (movimentacao.tipo === 'Entrada') {
                    silo.capacidade_atual += movimentacao.quantidade;
                } else if (movimentacao.tipo === 'Saida') {
                    silo.capacidade_atual -= movimentacao.quantidade;
                }

                // Salva as mudanças na tabela Silo
                await silo.save();
            }
        }
    }
);

