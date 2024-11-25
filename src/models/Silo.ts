import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface SiloAttributes {
  id: number;
  nome: string;
  capacidade_total: number;
  capacidade_atual: number;
  clienteId: string;
  updatedBy: string; // ID do usuário que fez a última alteração
  createdAt?: Date;
  updatedAt?: Date;
}

interface SiloCreationAttributes extends Optional<SiloAttributes, 'id'> {}

class Silo extends Model<SiloAttributes, SiloCreationAttributes> implements SiloAttributes {
  public id!: number;
  public nome!: string;
  public capacidade_total!: number;
  public capacidade_atual!: number;
  public clienteId!: string;
  public updatedBy!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Silo.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    capacidade_total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    capacidade_atual: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
    },
    clienteId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'clientes',
          key: 'id',
        },
      },
    updatedBy: {
      type: DataTypes.UUID,
      references:{
        model:'usuarios',
        key:'id'
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'silos',
  }
);

export default Silo;
