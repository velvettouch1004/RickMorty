import { resolvers } from '../graphql/resolvers';
import { characterByName, charactersByStatus } from './mockData';
import { CharacterType } from '../db/Character';
describe('Character Resolvers', () => {
    it('Should validate characterbyname', async () => {

        const args = { name: "Alien Googah" };
        const result: Array<CharacterType> = await resolvers.charactersByName(args);

        const filteredCharacter = result.map((character: any) => {
            const { createdAt, updatedAt, origin, ...rest } = character; // Specify the fields to ignore
            return rest;
        });
        expect(filteredCharacter).toEqual(characterByName);
    });

    it('Should retrieve correct structure and values for the first two characters by status', async () => {
        const args = { status: 'Alive' }
        const result = await resolvers.charactersByStatus(args);

        const firstTwoCharacters = result.slice(0, 2);
        // Remove the specified fields from each character
        const filteredCharacters = firstTwoCharacters.map((character: any) => {
            const { createdAt, updatedAt, origin, ...rest } = character;
            return rest;
        });
        expect(filteredCharacters).toEqual(charactersByStatus.slice(0, 2));
    });
});
