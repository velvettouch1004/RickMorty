var cron = require('node-cron');
import { Character } from '../db/Character';
import axios from 'axios';
import { API_URL } from '../constansts/constants';
//cron.schedule('0 */12 * * *', () => {

console.log('Cron job scheduled to run')
cron.schedule('* * * * *', async () => {
    try {
        // Fetch data from the external API
        const response = await axios.get(API_URL);
        const charactersData = response.data.results;

        // Iterate over the characters data and update the database if there are any changes
        for (const characterInfo of charactersData.slice(0, 20)) {
            // Check if the character already exists in the database
            const existingCharacter = await Character.findOne({ where: { id: characterInfo.id } });

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
            } else {
                // Create a new character in the database if it doesn't exist
                await Character.create({
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
    } catch (error) {
        console.error('Error updating database characters:', error);
    }
});
