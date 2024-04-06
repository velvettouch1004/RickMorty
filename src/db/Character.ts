import { DataTypes } from 'sequelize';
import { sequelize } from './dbConnection';

type CharacterType = {
  id: string,
  status: string,
  species: string,
  gender: string,
  name: string,
  origin: string,
}

// Define the Character model
const Character = sequelize.define('Character', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  status: DataTypes.STRING,
  species: DataTypes.STRING,
  gender: DataTypes.STRING,
  name: DataTypes.STRING,
  origin: DataTypes.STRING,
});

// Sync the model with the database
(async () => {
  try {
    await sequelize.sync(); // Sync the model with the database
  } catch (error) {
    console.error('Error syncing Character model:', error);
  }
})();

export { Character, CharacterType };