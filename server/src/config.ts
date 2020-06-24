// allow using .env files for environment variables
require('dotenv').config();

export const PORT: number = parseInt(process.env.PORT || '4000');
export const ENV: string = process.env.NODE_ENV || 'development';
