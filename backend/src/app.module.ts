import { Module } from '@nestjs/common';
import { GamesModule } from './games/games.module';
import { RobloxModule } from './roblox/roblox.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisModule,
    GamesModule, 
    RobloxModule, 
  ],
})
export class AppModule {}
