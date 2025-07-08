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

<script lang="ts">
    import { defineComponent, ref } from 'vue';

    // defineComponent
    // 好處：清晰結構、擴展性強、vue2結構
    export default defineComponent({
        name: 'DefineButton', // 名稱
        props: {
            name: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
        },
        emits: ['click', 'submit'],
        setup(props, { emit }) {
            const num = ref(999);

            const handleClick = (event: Event) => {
                emit('click', event);
                emit('submit', num.value);
            };

            return {
                props,
                num,
                handleClick,
            };
        },
    });
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
