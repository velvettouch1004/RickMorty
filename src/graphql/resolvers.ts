import { Character } from '../db/Character';
import { getCharactersByStatusFromCache, storeCharactersInCache } from '../redis/redis-cache'; // Import your cache module
import { MeasureExecutionTime } from '../execution-time/execution-time';
import { sequelize } from '../db/dbConnection';

async function filterCharacters(status: string, filterKey: string) {
    try {
        const whereClause: any = {
            [filterKey]: status // Constructing the where clause dynamically
        };
        // Attempt to retrieve data from cache
        let characters: any = await getCharactersByStatusFromCache(status, filterKey);
        if (characters == null) {
            characters = await Character.findAll({ where: whereClause });
            storeCharactersInCache(status, characters, filterKey)
            console.log("null characters")
        } else {
            characters = JSON.parse(characters)
        }
        return characters
    } catch (error) {
        console.error('Error fetching characters by status:', error);
        throw error;
    }
}
const resolvers = {
    async charactersByStatus({ status }: { status: string }) {
        return await filterCharacters(status, "status")
    },
    charactersBySpecies: async ({ species }: { species: string }) => {
        return await filterCharacters(species, "species")
    },
    charactersByGender: async ({ gender }: { gender: string }) => {
        return await filterCharacters(gender, "gender")

    },
    charactersByName: async ({ name }: { name: string }) => {
        return await filterCharacters(name, "name")
    },
    charactersByOrigin: async ({ origin }: { origin: string }) => {
        return await filterCharacters(origin, "origin")
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

export { resolvers };
