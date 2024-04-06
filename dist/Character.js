"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Character = void 0;
const sequelize_1 = require("sequelize");
const dbConnection_1 = require("./dbConnection");
// Define the Character model
const Character = dbConnection_1.sequelize.define('Character', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true, // Define id as the primary key
    },
    status: sequelize_1.DataTypes.STRING,
    species: sequelize_1.DataTypes.STRING,
    gender: sequelize_1.DataTypes.STRING,
    name: sequelize_1.DataTypes.STRING,
    origin: sequelize_1.DataTypes.STRING,
});
exports.Character = Character;
// Sync the model with the database
(async () => {
    try {
        await dbConnection_1.sequelize.sync(); // Sync the model with the database
        console.log('Character model synced successfully');
    }
    catch (error) {
        console.error('Error syncing Character model:', error);
    }
})();
