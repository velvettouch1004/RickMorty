"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const Character_1 = require("./Character");
// populate-db.ts
async function populateCharacters() {
    try {
        // Delete all existing records from the Characters table
        await Character_1.Character.destroy({ truncate: true });
        // Fetch data from the external API
        const response = await axios_1.default.get('https://rickandmortyapi.com/api/character');
        const charactersData = response.data.results; //the API response is an array of character objects
        // Iterate over the character data and insert into the database
        for (const characterInfo of charactersData.slice(0, 15)) { // Take only the first 15 characters
            await Character_1.Character.create({
                id: characterInfo.id,
                gender: characterInfo.gender,
                name: characterInfo.name,
                status: characterInfo.status,
                species: characterInfo.species,
                origin: 'characterOrigin'
            });
        }
        console.log('Character data inserted successfully.');
    }
    catch (error) {
        console.error('Error populating characters:', error);
    }
}
// Call the function to populate characters when the script is executed
populateCharacters();
