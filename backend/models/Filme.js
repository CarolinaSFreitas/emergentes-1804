import { DataTypes } from 'sequelize';
import { sequelize } from '../database/conecta.js';

export const Filme = sequelize.define('filme', {
  id : {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(60),
    allowNull: false
  },
  genero: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  duracao: {
    type: DataTypes.INTEGER(3),
    allowNull: false
  },
  preco: {
    type: DataTypes.DECIMAL(9, 2),
    allowNull: false    
  },
  sinopse: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  foto: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  num: {
    type: DataTypes.INTEGER(6),
    allowNull: false,
    defaultValue: 0
  },
  total: {
    type: DataTypes.INTEGER(8),
    allowNull: false,
    defaultValue: 0
  },
  destaque: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true
  }
});