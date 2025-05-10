import { Injectable } from '@nestjs/common';
import { GameIcon, GameInfo, GameThumbnails } from 'src/roblox/types';

@Injectable()
export class GamesService {
    buildGamesResponse(
        infos: Array<GameInfo>, 
        icons: Array<GameIcon>, 
        thumbnails: Array<GameThumbnails>
    ) {
        return infos.map(info => {
            const tObj = thumbnails.find(t => t.universeId == info.id);
            const iObj = icons.find(i => i.targetId == info.id);

            return {
                id: info.id,
                name: info.name,
                description: info.description,
                creator: info.creator.name,
                stats: {
                    playing: info.playing,
                    visits: info.visits,
                    starts: info.favoritedCount
                },
                icon: iObj ? iObj.imageUrl : "https://placehold.co/150x150",
                thumbnails: tObj ? tObj.thumbnails.map(t => t.imageUrl) : ["https://placehold.co/768x432"]
            }
        })
    }
}
