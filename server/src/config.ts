// allow using .env files for environment variables
require('dotenv').config();

export const PORT: number = parseInt(process.env.PORT || '4000');
export const ENV: string = process.env.NODE_ENV || 'development';

export const MYSQL = {
  host: process.env.MYSQL_HOST || 'localhost',
  database: process.env.MYSQL_DATABASE || 'dailytasks',
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
};
