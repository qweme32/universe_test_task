export interface GameItem {
    id: number; 
    name: string;
    description: string;
    creator: string;
    stats: {
        playing: number;
        visits: number;
        starts: number;
    };
    icon: string;
    thumbnails: Array<string>;
}

export async function useFetchGames(placeIds: Array<number>): Promise<Array<GameItem>> {
    return $fetch<Array<GameItem>>('/api/games', {
        method: 'POST',
        body: { placeIds }
    }).catch(e => { 
        console.error(e)
        return [] 
    });
}