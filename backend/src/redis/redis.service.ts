import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {Redis} from 'ioredis';

@Injectable()
export class RedisService implements OnModuleInit, OnModuleDestroy {
    private redis: Redis;
    private uri: string;

    async onModuleInit() {
        this.uri = process.env.REDIS_URI ?? "redis://127.0.0.1:6379";
        this.redis = new Redis(this.uri);

        this.redis.on('connect', () => {
            Logger.log("Connected to " + this.uri, "Redis");
        });

        this.redis.on('error', (err) => {
            Logger.error("Db connection failed. " + this.uri, "Redis");
        });
    }

    async onModuleDestroy() {
        await this.redis.quit();
    }

    async get(key: string): Promise<string | null> {
        return this.redis.get(key);
    }

    async multiGet(keys: Array<string>): Promise<Record<string, string | null>> {
        const res: Record<string, string | null> = {};
        // single request for all values
        const values = await this.redis.mget(...keys);

        let index = 0;
        for (const key of keys) {
            res[key] = values[index];
            index++;
        }

        return res;
    }

    async set(key: string, value: string, ttl?: number): Promise<void> {
        await (ttl !== undefined
            ? this.redis.set(key, value, 'EX', ttl)
            : this.redis.set(key, value));
    }

    async del(key: string): Promise<void> {
        await this.redis.del(key);
    }
}
