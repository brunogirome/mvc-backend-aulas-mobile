import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: Sequelize.STRING,
        email: Sequelize.STRING,
        telefone: Sequelize.INTEGER,
        cpf: Sequelize.STRING,
        senha: Sequelize.VIRTUAL,
        hash_senha: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async (usuario) => {
      if (usuario.senha) {
        usuario.hash_senha = await bcrypt.hash(usuario.senha, 7);
      }
    });

    return this;
  }

  checkPassword(senha) {
    return bcrypt.compare(senha, this.hash_senha);
  }

  static associate(models) {
    this.belongsTo(models.Endereco, {
      foreignKey: 'id_usuario',
      as: 'usuario',
    });
  }
}

export default Usuario;
