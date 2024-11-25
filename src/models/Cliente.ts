import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/database';

interface ClienteAttributes {
  id: string;
  nome: string;
  tipo_documento: 'Fisica' | 'Juridica' | 'Estrangeiro' | 'Outro';
  numero_documento: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ClienteCreationAttributes extends Optional<ClienteAttributes, 'id'> {}

class Cliente extends Model<ClienteAttributes, ClienteCreationAttributes> implements ClienteAttributes {
  public id!: string;
  public nome!: string;
  public tipo_documento!: 'Fisica' | 'Juridica' | 'Estrangeiro' | 'Outro';
  public numero_documento!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Cliente.init(
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
  }
);

export default Cliente;
