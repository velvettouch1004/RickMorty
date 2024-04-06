"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeCharactersInCache = exports.getCharactersByStatusFromCache = void 0;
const redis_client_1 = require("./redis-client"); // Import your Redis client
// Function to retrieve data from cache
async function getCharactersByStatusFromCache(status, filterKey) {
    const cacheKey = `${filterKey}-${status}`;
    const clientv = await (0, redis_client_1.client)();
    // Check if data is cached in Redis
    const value = await clientv.get(cacheKey);
    await clientv.disconnect();
    return value;
}
exports.getCharactersByStatusFromCache = getCharactersByStatusFromCache;
// Function to store data in cache
async function storeCharactersInCache(status, characters, filterKey) {
    const cacheKey = `${filterKey}-${status}`;
    const clientv = await (0, redis_client_1.client)();
    const value = await clientv.set(cacheKey, JSON.stringify(characters));
    await clientv.disconnect();
    return value;
}
exports.storeCharactersInCache = storeCharactersInCache;
