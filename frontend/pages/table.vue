<script setup lang="ts">
const placeIds = usePlaceIds();
const games = useState<Array<GameItem>>("games", () => []);
const isLoading = useState("games-loading", () => true);
if (placeIds.length == 0) useRouter().push("/");

onMounted(async () => {
    games.value = await useFetchGames(placeIds);
    isLoading.value = false;
});
onUnmounted(() => {
    isLoading.value = true;
});
</script>
<template>
    <Layout :w="1000">
        <Header title="Game Table" icon="material-symbols:arrow-back" @action="() => $router.push('/')" />
        <div class="loader" v-if="isLoading">Loading data...</div>
        <div v-else class="table">
            <table class="game-table">
                <thead>
                    <tr>
                        <th>Icon</th>
                        <th>Name</th>
                        <th>Desc</th>
                        <th>Author</th>
                        <th>Online</th>
                        <th>Visits</th>
                        <th>Favs</th>
                        <th>Thumbs</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" :key="game.id">
                        <td>
                            <img :src="game.icon" alt="Icon" width="50" height="50" style="object-fit: cover; border-radius: 8px;" />
                        </td>
                        <td>{{ game.name }}</td>
                        <td>{{ game.description }}</td>
                        <td>{{ game.creator }}</td>
                        <td>{{ game.stats.playing }}</td>
                        <td>{{ game.stats.visits }}</td>
                        <td>{{ game.stats.starts }}</td>
                        <td>
                            <div class="thumbnails">
                                <img v-for="(thumb, idx) in game.thumbnails" :key="idx" :src="thumb" alt="Thumbnail"
                                    width="80" style="margin: 4px 0; border-radius: 8px;" />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        
    </Layout>
</template>
<style scoped lang="scss">
.game-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid var(--outline);
    box-sizing: border-box;
}

.table {
    margin-top: 16px;
    border-radius: 8px;
    border: 1px solid var(--outline);
}

.game-table th,
.game-table td {
    box-sizing: border-box;
    border: 1px solid var(--outline);
    padding: 8px;
    vertical-align: top;
    text-align: left;
}

.game-table th {
    background-color: var(--secondary);
}

.thumbnails {
    display: flex;
    flex-direction: column;
}
</style>