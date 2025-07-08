<template>
    <button
        type="button"
        class="btn btn-primary"
        :class="{ disabled: props.disabled }"
        :disabled="props.disabled"
        @click="handleClick"
    >
        {{ props.name || '送出' }}
    </button>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const num = ref(999);

    /*
        Vue 3 特性
        快速開發、簡潔、直觀、效能高
    */

    /* 以下兩種寫法都可以 */
    // const props = defineProps(['disabled']);
    // const props = defineProps<{
    //     name?: string;
    //     disabled?: boolean;
    // }>();

    const props = defineProps(['name', 'disabled']);

    // 元件要對外發送事件類型
    const emit = defineEmits(['click', 'submit']);

    const handleClick = (event: any) => {
        emit('click', event); // click event
        emit('submit', num); // submit event
    };
</script>
<style lang="scss" scoped>
    @use '@/assets/scss/_forward' as *;

    .btn {
        display: block;
        width: 100%;
        padding: 0.7rem;
        margin: 0 0.2rem;
        font-size: 1rem;
        border: none;
        border-radius: 2rem;
        cursor: pointer;
        transition: 0.3s ease;

        &.btn-primary {
            background: $deep_blue;
            color: $white;
        }

        &.disabled {
            background: $light_gray;
        }
    }
</style>
