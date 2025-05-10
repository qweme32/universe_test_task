<script setup lang="ts">
interface Props {
  w?: number
}

withDefaults(defineProps<Props>(), {
  w: 400
});
</script>
<template>
    <div class="layout">
        <div class="content" :style="`width: ${w}px`" >
            <slot />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.layout {
    display: flex;
    flex-direction: column;
    align-items: center;

    .content {
        margin-top: 64px;
    }
}
</style>
