import { Type } from 'class-transformer';
import { IsArray, ArrayNotEmpty, IsNumber, ArrayMinSize, ArrayMaxSize } from 'class-validator';

export class GamesLinksDto {
    @IsArray()
    @ArrayNotEmpty()
    @IsNumber({}, { each: true })
    @Type(() => Number)
    @ArrayMaxSize(24)
    @ArrayMinSize(1)
    placeIds: Array<number>;
}

