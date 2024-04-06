import axios from 'axios';
import { Character } from './Character';
import { API_URL } from '../constansts/constants';

async function populateCharacters() {
    try {
        // Delete all existing records from the Characters table
        await Character.destroy({ truncate: true });

        // Fetch data from the external API
        const response = await axios.get(API_URL);
        const charactersData = response.data.results; //the API response is an array of character objects
        // Iterate over the character data and insert into the database
        for (const characterInfo of charactersData.slice(0, 15)) { // Take only the first 15 characters
            await Character.create({
                id: characterInfo.id,
                gender: characterInfo.gender,
                name: characterInfo.name,
                status: characterInfo.status,
                species: characterInfo.species,
                origin: 'characterOrigin'
            });
        }
        console.log('Initial 15 Characters inserted successfully from external API.');
    } catch (error) {
        console.error('Error populating characters:', error);
    }
}
// Call the function to populate characters when the script is executed
populateCharacters();