import dotenv from 'dotenv';

dotenv.config();

const config = {
  development: {
    username: process.env.DEV_USERNAME,
    password: process.env.DEV_PASSWORD,
    database: process.env.DEV_DATABASE,
    host: process.env.DEV_HOST,
    dialect: 'mysql',
    port: process.env.DEV_PORT,
  },
  test: {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
    database: process.env.TEST_DATABASE,
    host: process.env.TEST_HOST,
    dialect: 'mysql',
    port: process.env.TEST_PORT,
  },
  production: {
    username: process.env.PROD_USERNAME,
    password: process.env.PROD_PASSWORD,
    database: process.env.PROD_DATABASE,
    host: process.env.PROD_HOST,
    dialect: 'mysql',
    port: process.env.PROD_PORT,
  }
};

export default config;
