import { createClient } from 'redis';

export async function client() {
    return createClient({ url: 'redis://localhost:6379' })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}