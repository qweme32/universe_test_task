<script setup lang="ts">
const helper = useGameLinks();
const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const isValid = ref(true);

watch(() => props.modelValue, (newVal) => {
    isValid.value = helper.validate(newVal);
});
</script>

<template>
    <input :class="`${isValid ? '' : 'invalid'}`" type="text"
        :value="props.modelValue"
        @input="emit('update:modelValue', $event.target.value)"
    >
</template>
<style lang="scss" scoped>
input {
    padding: 12px;
    width: 100%;
    box-sizing: border-box;
    border: 1px solid var(--outline);
    border-radius: 8px;
    color: var(--primary);
    background: var(--secondary);
    outline: none;

    &.invalid {
        border: 1px solid var(--red);
    }
}
</style>