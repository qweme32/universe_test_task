export interface GameInfo {
    id: number;
    rootPlaceId: number;
    name: string;
    description: string;
    sourceName: string;
    sourceDescription: string;
    creator: {
        id: number;
        name: string;
        type: 'User' | 'Group' | string;
        isRNVAccount: boolean;
        hasVerifiedBadge: boolean;
    };
    price: number | null;
    allowedGearGenres: string[];
    allowedGearCategories: string[];
    isGenreEnforced: boolean;
    copyingAllowed: boolean;
    playing: number;
    visits: number;
    maxPlayers: number;
    created: string; // ISO date
    updated: string; // ISO date
    studioAccessToApisAllowed: boolean;
    createVipServersAllowed: boolean;
    universeAvatarType: string; 
    genre: string;
    genre_l1: string;
    genre_l2: string;
    isAllGenre: boolean;
    isFavoritedByUser: boolean;
    favoritedCount: number;
}

export interface GameThumbnails {
    universeId: number;
    error: null;
    thumbnails: Array<{
        imageUrl: string;
    }>
}

export interface GameIcon {
    targetId: number;
    imageUrl: string;
}