import { Body, Controller, Post } from '@nestjs/common';
import { GamesLinksDto } from './games.dto';
import { RobloxService } from 'src/roblox/roblox.service';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
    constructor(
        private readonly robloxService: RobloxService,
        private readonly gameService: GamesService,
    ) {};

    @Post('/')
    async fetchGames(@Body() body: GamesLinksDto) {
        const valids = (await this.robloxService
            .universeIds(body.placeIds))
            .filter(v => v !== null);

        const [gameInfos, gameIcons, gameThumbnails] = await Promise.all([
            this.robloxService.gameInfos(valids),
            this.robloxService.gameIcons(valids),
            this.robloxService.gameThumbnails(valids),
        ]);

        return this.gameService.buildGamesResponse(gameInfos, gameIcons, gameThumbnails);
    }
}
