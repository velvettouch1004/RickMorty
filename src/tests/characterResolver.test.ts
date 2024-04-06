import { resolvers } from '../graphql/resolvers';
import { characterByName, charactersByStatus } from './mockData';

describe('Character Resolvers', () => {
    it('Should validate characterbyname', async () => {
        // Mock the findAll method of the Character model
        //Character.findAll = jest.fn().mockResolvedValue(mockCharacterData);

        // Define test data
        const args = { name: 'Amish Cyborg' };

        // Call the resolver function
        const result = await resolvers.charactersByName(args);

        // Assertions
        await expect(result).toEqual(characterByName); // Check if the result matches the mock data
        //expect(Character.findAll).toHaveBeenCalledWith({ where: { name: 'AlAmish Cyborg' } }); // Check if findAll method was called with correct arguments
    });

    it('Should retrieve correct structure and values for the first two characters by status', async () => {
        const args = { status: 'Alive' }
        const result = await resolvers.charactersByStatus(args);

        const firstTwoCharacters = result.slice(0, 2);
        // Remove the specified fields from each character
        const filteredCharacters = firstTwoCharacters.map((character: any) => {
            const { createdAt, updatedAt, ...rest } = character; // Specify the fields to ignore
            return rest;
        });
        await expect(filteredCharacters).toEqual(charactersByStatus.slice(0, 2)); // Check if the result matches the mock data
    });
});
