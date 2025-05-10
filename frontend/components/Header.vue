<script setup lang="ts">
interface Props {
  title: string
  icon: string
};

defineProps<Props>();
defineEmits(["action"]);
</script>
<template>
    <div class="header">
        <div class="title">{{ title }}</div>
        <div class="action" @click="() => $emit('action')">
            <Icon :name="icon" :width="32" />
        </div>
    </div>
</template>
<style lang="scss" scoped>
.header {
    display: grid;
    grid-template-columns: 1fr 40px;

    .title {
        font-size: 32px;
        font-weight: 700;
    }

    .action {
        position: relative;
        top: 2px;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 8px;
        padding: 4px;
        box-sizing: border-box;
        background: var(--green);
    }
}
</style>