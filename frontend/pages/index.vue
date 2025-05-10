<script setup lang="ts">
const helper = useGameLinks();
const router = useRouter();
const links = useState("links", () => [""]);

const onSearch = () => {
    const placeIds = new Array(
        ...new Set(
            links.value
                .filter(l => helper.validate(l))
                .map(l => helper.extractPlaceId(l))
        )
    );

    if (placeIds.length == 0) return;
    
    router.push(`/table?placeIds=${[placeIds.join(',')]}`);
}

const onAddGame = () => {
    links.value.push("");
}
</script>

<template>
    <Layout :w="400">
        <Header @action="onSearch" title="Roblox Games" icon="material-symbols:search" />
        <GameInput style="margin-top: 8px;" :key="index" v-for="(_, index) in links" v-model="links[index]" />
        <div @click="onAddGame" class="add">add game</div>
    </Layout>
</template>
<style lang="scss" scoped>
.add {
    margin: 4px;
    font-weight: 600;
    font-size: 12px;
    cursor: pointer;
    color: var(--outline);
}
</style>
