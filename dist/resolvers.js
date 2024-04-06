"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const Character_1 = require("./Character");
const redis_cache_1 = require("./redis/redis-cache"); // Import your cache module
async function filterCharacters(status, filterKey) {
    try {
        const whereClause = {
            [filterKey]: status // Constructing the where clause dynamically
        };
        // Attempt to retrieve data from cache
        let characters = await (0, redis_cache_1.getCharactersByStatusFromCache)(status, filterKey);
        if (characters == null) {
            characters = await Character_1.Character.findAll({ where: whereClause });
            (0, redis_cache_1.storeCharactersInCache)(status, characters, filterKey);
            console.log("null characters");
        }
        else {
            characters = JSON.parse(characters);
        }
        return characters;
    }
    catch (error) {
        console.error('Error fetching characters by status:', error);
        throw error;
    }
}
const resolvers = {
    async charactersByStatus({ status }) {
        return await filterCharacters(status, "status");
    },
    charactersBySpecies: async ({ species }) => {
        return await filterCharacters(species, "species");
    },
    charactersByGender: async ({ gender }) => {
        return await filterCharacters(gender, "gender");
    },
    charactersByName: async ({ name }) => {
        return await filterCharacters(name, "name");
    },
    charactersByOrigin: async ({ origin }) => {
        return await filterCharacters(origin, "origin");
    },
    deleteCharacter: async ({ id }) => {
        try {
            const deletedCharacter = await Character_1.Character.findByPk(id);
            if (!deletedCharacter) {
                throw new Error('Character not found');
            }
            await deletedCharacter.destroy();
            return id;
        }
        catch (error) {
            console.error('Error deleting character:', error);
            throw error;
        }
    },
};
exports.resolvers = resolvers;
