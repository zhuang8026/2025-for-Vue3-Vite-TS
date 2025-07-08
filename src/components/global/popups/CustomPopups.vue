<template>
    <transition name="fade">
        <div v-if="visible" class="popups-overlay">
            <div class="popups-body">
                <h2 class="popups-title">{{ props.title }}</h2>
                <div class="popups-message">{{ props.message }}</div>
                <div class="popups-btns">
                    <UIButton
                        v-for="btn in props.buttons"
                        :key="btn.type"
                        :name="btn.label"
                        @click="clickBtn(btn.type)"
                    />
                    <!-- <UIButton name="取消" @click="clickBtn('cancel')" /> -->
                    <!-- <UIButton name="確認" @click="clickBtn('confirm')" /> -->
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { ref } from 'vue';
    // components
    import UIButton from '@/components/ui/Button.vue';

    const visible = ref(false);

    const props = withDefaults(
        defineProps<{
            title?: string;
            message?: string;
            buttons?: {
                type: 'confirm' | 'cancel';
                label: string;
            }[];
            demo?: {
                type: 'a001' | 'a002';
                test: string;
            };
        }>(),
        {
            title: '提示',
            message: '發生未知錯誤',
            buttons: () => [
                { type: 'cancel', label: '取消' },
                { type: 'confirm', label: '確認' },
            ], // // array 練習
            demo: () => ({
                type: 'a001',
                test: 'testing',
            }), // object 練習
        }
    );

    // const props = defineProps<{
    //     title: string;
    //     message: string;
    // }>();

    // 提供方法讓外部可以控制
    defineExpose({
        show: () => (visible.value = true),
        hide: () => (visible.value = false),
    });

    // 提供方法讓外部可以控制
    const emit = defineEmits(['confirm', 'cancel']);

    const clickBtn = (type: 'confirm' | 'cancel') => {
        visible.value = false;
        emit(type, type);
    };
</script>

<style lang="scss" scoped>
    @use '@/assets/scss/_forward' as *;
    .popups-overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .popups-body {
            max-width: 450px;
            background: $white;
            padding: 2rem 2rem;
            border-radius: 1rem;
            .popups-title {
                text-align: center;
                font-size: $fs-20;
            }
            .popups-message {
                padding: 1rem;
            }
            .popups-btns {
                width: 100%;
                display: flex;
                // gap: 0.6rem;
                // grid-template-columns: repeat(2, 1fr);
            }
        }
    }

    // 動畫
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
