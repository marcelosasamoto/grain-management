import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';
import Silo from './Silo';

interface MovimentacaoAttributes {
    id: number;
    tipo: 'Entrada' | 'Saida';
    quantidade: number;
    silo_id: number;
    cliente_id: string;
    created_by: string; // ID do usuário que fez a movimentação
    created_at?: Date;
}

export interface MovimentacaoSiloInterface extends Optional<MovimentacaoAttributes, 'id'> {}

export default class MovimentacaoSilo extends Model<MovimentacaoAttributes, MovimentacaoSiloInterface> implements MovimentacaoAttributes {
    public id!: number;
    public tipo!: 'Entrada' | 'Saida';
    public quantidade!: number;
    public silo_id!: number;
    public cliente_id!: string;
    public created_by!: string;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}

MovimentacaoSilo.init(
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
            validate: {
                min: 0, // Evita movimentações negativas
            },
        },
        silo_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'silos',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        cliente_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'clientes',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        created_by: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'usuarios',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        tableName: 'movimentacoes_silo',
        timestamps: true,
        underscored: true,
        hooks: {
            afterCreate: async (movimentacao, options) => {
                try {
                    // Encontre o silo correspondente
                    const silo = await Silo.findByPk(movimentacao.silo_id);

                    if (!silo) {
                        throw new Error('Silo não encontrado');
                    }

                    // Atualiza a capacidade atual do silo
                    if (movimentacao.tipo === 'Entrada') {
                        if (silo.capacidade_atual + movimentacao.quantidade > silo.capacidade_total) {
                            throw new Error('Movimentação excede a capacidade total do silo');
                        }
                        silo.capacidade_atual += movimentacao.quantidade;
                    } else if (movimentacao.tipo === 'Saida') {
                        if (silo.capacidade_atual - movimentacao.quantidade < 0) {
                            throw new Error('Movimentação resultaria em capacidade negativa no silo');
                        }
                        silo.capacidade_atual -= movimentacao.quantidade;
                    }

                    // Salva as mudanças na tabela Silo
                    await silo.save();
                } catch (error:any) {
                    console.error(`Erro ao atualizar o silo após movimentação: ${error.message}`);
                    throw error; // Propaga o erro para o chamador
                }
            },
        },
    }
);

// Associações
import Cliente from './Cliente';
import Usuario from './Usuario';

MovimentacaoSilo.belongsTo(Silo, { foreignKey: 'silo_id' });
MovimentacaoSilo.belongsTo(Cliente, { foreignKey: 'cliente_id' });
MovimentacaoSilo.belongsTo(Usuario, { foreignKey: 'created_by' });
