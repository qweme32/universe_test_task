import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';
import { GameIcon, GameInfo, GameThumbnails } from './types';
import { RedisService } from '../redis/redis.service';
import { useHydratedCacheRequest } from '../utils/hcr';

@Injectable()
export class RobloxService {
    private UNIVERSE_TTL = 24 * 60 * 60; // 24 hours
    private GAME_TTL = 5 * 60; // 5 min
    private STATIC_IMGS_TTL = 1 * 60 * 60; // 1 hour

    constructor (
        private redisService: RedisService
    ) {}

    private async universeId(placeId: number) {
        const universeIdCached = await this.redisService.get(`uid:${placeId}`);
        if (universeIdCached) {
            Logger.debug(`placeId (${placeId}) converted to universeId (${universeIdCached}) from cache.`, 'Roblox');
            return parseInt(universeIdCached);
        }

        const { data } = await axios.get<{
            universeId: number
        }>(`https://apis.roblox.com/universes/v1/places/${placeId}/universe`);

        await this.redisService.set(
            `uid:${placeId}`, 
            data.universeId.toString(), 
            this.UNIVERSE_TTL
        )

        return data.universeId;
    }

    async universeIds(placeIds: Array<number>): Promise<Array<number>> {
        return Promise.all(placeIds.map(pId => this.universeId(pId)));
    }    

    private async gameInfosResolver(indexes: Array<number>) {
        const { data } = await axios.get<{
            data: Array<GameInfo>
        }>(`https://games.roblox.com/v1/games`, { params: {
            universeIds: indexes.join(",")
        }});

        return data.data;
    }

    private async gameIconsResolver(indexes: Array<number>) {
        const { data } = await axios.get<{
            data: Array<GameIcon>
        }>(`https://thumbnails.roblox.com/v1/games/icons`, { params: {
            universeIds: indexes.join(","),
            size: "150x150",
            format: "Png",
            isCircular: false,
        }});

        return data.data;
    }

    private async gameThumbnailsResolver(indexes: Array<number>) {
        const { data } = await axios.get<{
            data: Array<GameThumbnails>
        }>(`https://thumbnails.roblox.com/v1/games/multiget/thumbnails`, { params: {
            universeIds: indexes.join(","),
            size: "768x432",
            format: "Png",
            isCircular: false,
            countPerUniverse: 999
        }});

        return data.data;
    }    

    async gameInfos(universeIds: Array<number>): Promise<Array<GameInfo>> {
        return useHydratedCacheRequest<GameInfo>(
            universeIds,
            this.gameInfosResolver,
            {
                redis: this.redisService,
                ttl: this.GAME_TTL,
                prefix: "game",
                indexInFetchField: "id"
            }
        )
    }

    async gameIcons(universeIds: Array<number>): Promise<Array<GameIcon>> {
        return useHydratedCacheRequest<GameIcon>(
            universeIds,
            this.gameIconsResolver,
            {
                redis: this.redisService,
                ttl: this.STATIC_IMGS_TTL,
                prefix: "icon",
                indexInFetchField: "targetId"
            }
        )
    }

    async gameThumbnails(universeIds: Array<number>): Promise<Array<GameThumbnails>> {
        return useHydratedCacheRequest<GameThumbnails>(
            universeIds,
            this.gameThumbnailsResolver,
            {
                redis: this.redisService,
                ttl: this.STATIC_IMGS_TTL,
                prefix: "thumbnails",
                indexInFetchField: "universeId"
            }
        )
    }
}
