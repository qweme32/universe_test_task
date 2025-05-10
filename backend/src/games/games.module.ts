import { Module } from '@nestjs/common';
import { GamesService } from './games.service';
import { GamesController } from './games.controller';
import { RobloxModule } from 'src/roblox/roblox.module';
import { RobloxService } from 'src/roblox/roblox.service';

@Module({
  imports: [RobloxModule],
  providers: [GamesService, RobloxService],
  controllers: [GamesController]
})
export class GamesModule {}
