class GameLinksHelper {
    validate(data: string): boolean {
        return /^https:\/\/(www\.)?roblox\.com\/games\/\d+\/?.*$/i.test(data)
    }

    extractPlaceId(link: string): string {
        const [_, data] = link.split("/games/");
        return data.includes("/") ? data.split("/")[0] : data;
    }
}

export const useGameLinks = () => {
    return new GameLinksHelper();
}