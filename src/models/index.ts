import Cliente from './Cliente';
import Usuario from './Usuario';
import Silo from './Silo';
import Movimentacao from './MovimentacaoSilo';

// Relacionamentos
Cliente.hasMany(Usuario, { foreignKey: 'clienteId' });
Usuario.belongsTo(Cliente, { foreignKey: 'clienteId' });

Cliente.hasMany(Silo, { foreignKey: 'clienteId' });
Silo.belongsTo(Cliente, { foreignKey: 'clienteId' });

Silo.hasMany(Movimentacao, { foreignKey: 'siloId' });
Movimentacao.belongsTo(Silo, { foreignKey: 'siloId' });

Usuario.hasMany(Movimentacao, { foreignKey: 'createdBy' });
Movimentacao.belongsTo(Usuario, { foreignKey: 'createdBy' });

export { Cliente, Usuario, Silo, Movimentacao };
