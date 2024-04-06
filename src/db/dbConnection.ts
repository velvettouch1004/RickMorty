import { Sequelize } from 'sequelize';

/**
 * Configure postgres db
 */
// const sequelize = new Sequelize('RickMortyDB', 'postgres', '1996', {
//     host: 'localhost',
//     dialect: 'postgres',
//     logging: false
// });


/**
 * Configure file database
 */
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './db.sqlite', // SQLite3 memory database
    logging: false
});

export { sequelize };