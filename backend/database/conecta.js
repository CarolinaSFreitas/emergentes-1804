import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  'next24_manha', 'aluno', 'senacrs', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306
});