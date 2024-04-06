"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const redis_1 = require("redis");
async function client() {
    return (0, redis_1.createClient)({ url: 'redis://localhost:6379' })
        .on('error', err => console.log('Redis Client Error', err))
        .connect();
}
exports.client = client;
