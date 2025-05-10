import { joinURL } from "ufo";

export default defineEventHandler(async event => {
    const proxy = useRuntimeConfig().apiUrl;

    const path = event.path.replace("/api", "");
    const target = joinURL(proxy, path);

    console.log(path, target);
    return proxyRequest(event, target);
});