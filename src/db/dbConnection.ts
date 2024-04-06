import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('RickMortyDB', 'postgres', '1996', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false
});

export { sequelize };