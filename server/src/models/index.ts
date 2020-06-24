import { Sequelize } from 'sequelize';
import { User, userSchema } from './user';
import { MYSQL } from '../config';

export const sequelize = new Sequelize({
  host: MYSQL.host,
  database: MYSQL.database,
  dialect: 'mysql',
  username: MYSQL.user,
  password: MYSQL.password,
});

export async function initializeModels(forceSync = false): Promise<Sequelize> {
  User.init(userSchema, { tableName: 'user', sequelize });
  User.sync({ force: forceSync });
  return sequelize;
}
