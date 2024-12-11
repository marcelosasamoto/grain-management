import Silo from './Silo';
import MovimentacaoSilo from './MovimentacaoSilo';
import Usuario from './Usuario';
import Cliente from './Cliente';

// Cliente e Silos
Cliente.hasMany(Silo, { foreignKey: 'cliente_id' });
Silo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Silo e Movimentações
Silo.hasMany(MovimentacaoSilo, { foreignKey: 'silo_id' });
MovimentacaoSilo.belongsTo(Silo, { foreignKey: 'silo_id' });

// Cliente e Movimentações
Cliente.hasMany(MovimentacaoSilo, { foreignKey: 'cliente_id' });
MovimentacaoSilo.belongsTo(Cliente, { foreignKey: 'cliente_id' });

// Usuário e Movimentações
Usuario.hasMany(MovimentacaoSilo, { foreignKey: 'created_by' });
MovimentacaoSilo.belongsTo(Usuario, { foreignKey: 'created_by' });
