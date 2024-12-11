import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SiloAttributes {
  id: number;
  nome: string;
  capacidade_total: number;
  capacidade_atual: number;
  cliente_id: string;
  updated_by: string; // ID do usuário que fez a última alteração
  created_at?: Date;
  updated_at?: Date;
}

export interface SiloInterface extends Optional<SiloAttributes, 'id'> {}

export class Silo extends Model<SiloAttributes, SiloInterface> implements SiloAttributes {
  public id!: number;
  public nome!: string;
  public capacidade_total!: number;
  public capacidade_atual!: number;
  public cliente_id!: string;
  public updated_by!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

Silo.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacidade_total: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    capacidade_atual: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: 0,
      },
    },
    cliente_id: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'clientes', // Certifique-se de que o nome da tabela está em minúsculas
        key: 'id',
      },
    },
    updated_by: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'usuarios', // Certifique-se de que o nome da tabela está em minúsculas
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'silos',
    timestamps: true,
    underscored: true, // Gera colunas created_at e updated_at
  }
);

export default Silo;
