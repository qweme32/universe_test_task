export function usePlaceIds(): Array<number> {
    const route = useRoute();
    let placeIds: Array<number> = [];

    if (!("placeIds" in route.query)) {
        return [];
    }
    
    if (route.query.placeIds?.includes(",")) {
        // @ts-ignore
        placeIds = route.query.placeIds.split(",").map(v => parseInt(v));
    } else {
        // @ts-ignore
        placeIds = [parseInt(route.query.placeIds)]
    }
    
    if (placeIds.includes(NaN)) {
        return [];
    };
    
    return placeIds;
}