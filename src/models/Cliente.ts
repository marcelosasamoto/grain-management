import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

// Definição dos atributos da tabela Cliente
interface ClienteAttributes {
  id: string;
  nome: string;
  tipo_documento: 'Fisica' | 'Juridica' | 'Estrangeiro' | 'Outro';
  numero_documento: string;
  created_at?: Date;
  updated_at?: Date;
}

// Interface para criação/atualização de cliente
export interface ClienteInterface extends Optional<ClienteAttributes, 'id'> {}

// Modelo Cliente
export class Cliente extends Model<ClienteAttributes, ClienteInterface> implements ClienteAttributes {
  public id!: string;
  public nome!: string;
  public tipo_documento!: 'Fisica' | 'Juridica' | 'Estrangeiro' | 'Outro';
  public numero_documento!: string;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

// Inicialização do modelo
Cliente.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tipo_documento: {
      type: DataTypes.ENUM('Fisica', 'Juridica', 'Estrangeiro', 'Outro'),
      allowNull: false,
    },
    numero_documento: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'clientes',
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
    underscored: true, // Usa snake_case para os nomes das colunas
  }
);

export default Cliente;
