// allow using .env files for environment variables
require('dotenv').config();

export const PORT: number = parseInt(process.env.PORT || "4000");
