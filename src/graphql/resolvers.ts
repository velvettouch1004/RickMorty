import { Character } from '../db/Character';
import { getCharactersByStatusFromCache, storeCharactersInCache } from '../redis/redis-cache'; // Import cache module
import { measureExecutionTime } from '../execution-time/execution-time';
import { CharacterType } from '../db/Character';

class ResolversClass {
    @measureExecutionTime()
    static async filterCharacters(status: string, filterKey: string) {
        try {
            const whereClause: any = {
                [filterKey]: status // Constructing the where clause dynamically
            };
            // Attempt to retrieve data from cache
            let characters: any = await getCharactersByStatusFromCache(status, filterKey);
            if (characters == null) {
                characters = await Character.findAll({ where: whereClause });
                characters.length != 0 ? storeCharactersInCache(status, characters, filterKey) : null
                    characters = characters?.map((character: any) => character.toJSON());
            } else {
                characters = JSON.parse(characters)
            }
            return characters
        } catch (error) {
            console.error('Error fetching characters by status:', error);
            throw error;
        }
    }
}
export const resolvers = {
    async charactersByStatus({ status }: { status: string }) {
        return await ResolversClass.filterCharacters(status, "status")
    },
    charactersBySpecies: async ({ species }: { species: string }) => {
        return await ResolversClass.filterCharacters(species, "species")
    },
    charactersByGender: async ({ gender }: { gender: string }) => {
        return await ResolversClass.filterCharacters(gender, "gender")

    },
    charactersByName: async ({ name }: { name: string }) => {
        return await ResolversClass.filterCharacters(name, "name")
    },
    charactersByOrigin: async ({ origin }: { origin: string }) => {
        return await ResolversClass.filterCharacters(origin, "origin")
    },
    deleteCharacter: async ({ id }: { id: number }) => {
        try {
            const deletedCharacter = await Character.findByPk(id);
            if (!deletedCharacter) {
                throw new Error('Character not found');
            }
            await deletedCharacter.destroy();

            return id;
        } catch (error) {
            console.error('Error deleting character:', error);
            throw error;
        }
    },
};