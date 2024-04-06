"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var cron = require('node-cron');
const Character_1 = require("../Character");
const axios_1 = __importDefault(require("axios"));
//cron.schedule('0 */12 * * *', () => {
cron.schedule('* * * * *', async () => {
    console.log('cron job scheduled');
    try {
        // Fetch data from the external API
        const response = await axios_1.default.get('https://rickandmortyapi.com/api/character');
        const charactersData = response.data.results; // Assuming the API response is an array of character objects
        // Iterate over the characters data and update the database if there are any changes
        for (const characterInfo of charactersData.slice(0, 20)) {
            // Check if the character already exists in the database
            const existingCharacter = await Character_1.Character.findOne({ where: { id: characterInfo.id } });
            if (existingCharacter) {
                // Update the character if there are any changes
                await existingCharacter.update({
                    // Update character fields as needed
                    status: characterInfo.status,
                    species: characterInfo.species,
                    gender: characterInfo.gender,
                    name: characterInfo.name,
                    origin: 'characterOrigin',
                });
            }
            else {
                // Create a new character in the database if it doesn't exist
                await Character_1.Character.create({
                    id: characterInfo.id,
                    status: characterInfo.status,
                    species: characterInfo.species,
                    gender: characterInfo.gender,
                    name: characterInfo.name,
                    origin: 'characterOrigin',
                });
            }
        }
        console.log('Database characters updated successfully.');
    }
    catch (error) {
        console.error('Error updating database characters:', error);
    }
});
