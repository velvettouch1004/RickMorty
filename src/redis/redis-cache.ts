import { client } from './redis-client';
import { CharacterType } from '../db/Character';

/**
 * Function to retrieve data from cache
 * @param status 
 * @param filterKey 
 * @returns value retrieved from cache
 */
export async function getCharactersByStatusFromCache(status: string, filterKey: string) {
    const cacheKey: string = `${filterKey}-${status}`;
    const clientv = await client();

    // Check if data is cached in Redis
    const value = await clientv.get(cacheKey);

    await clientv.disconnect()
    return value;
}

/**
 * Function to store data in cache
 * @param status 
 * @param characters 
 * @param filterKey 
 * @returns 
 */
export async function storeCharactersInCache(status: string, characters: Array<CharacterType>, filterKey: string) {
    const cacheKey: string = `${filterKey}-${status}`;
    const clientv = await client();

    const value = await clientv.set(cacheKey, JSON.stringify(characters));
    await clientv.disconnect()
    return value;
}
