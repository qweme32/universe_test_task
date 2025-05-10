import { Logger } from "@nestjs/common";
import { RedisService } from "../redis/redis.service";

type FetchResolver<T> = (indexes: number[]) => Promise<Array<T>>;
interface HydratedCacheRequestOptions {
    ttl: number;
    prefix: string; // redis prefix for keys
    indexInFetchField: string; // in this case universeId from roblox api gives out differently so it is needed
    redis: RedisService; 
}

// Smart array caching designed exclusively for this test case in roblox )
export async function useHydratedCacheRequest<T>(
    indexes: Array<number>, 
    resolver: FetchResolver<T>,
    options: HydratedCacheRequestOptions
): Promise<Array<T>> {
    const cachedValues = await options.redis.multiGet(
        indexes.map(idx => `${options.prefix}:${idx}`)
    );

    const cachedRes: Array<T> = [];
    let fetchedRes: Array<T> = [];
    const indexesToFetch: Array<number> = [];

    // Check cached and not cached indexes.
    for (const index of indexes) {
        if (cachedValues[`${options.prefix}:${index}`] != null) {
            Logger.debug(`${options.prefix} ${index} received from cache.`, 'Roblox');
            cachedRes.push(JSON.parse(cachedValues[`${options.prefix}:${index}`] as string));
        } else {
            indexesToFetch.push(index);
        }
    }

    if (indexesToFetch.length != 0) {
        fetchedRes = await resolver(indexesToFetch);

        // Cache logic
        fetchedRes.forEach(async (obj) => {
            await options.redis.set(
                `${options.prefix}:${obj[options.indexInFetchField]}`, 
                JSON.stringify(obj), 
                options.ttl
            );
            Logger.debug(`${options.prefix} ${obj[options.indexInFetchField]} stored to cache.`, 'Roblox');
        })
    }

    return [...cachedRes, ...fetchedRes];
}