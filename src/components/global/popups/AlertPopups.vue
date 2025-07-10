<template>
    <transition name="fade">
        <div v-if="popup.visible" class="popups-overlay">
            <div class="popups-body">
                <h2 class="popups-title">{{ popup.title }}</h2>
                <div class="popups-message">{{ popup.message }}</div>
                <div class="popups-btns">
                    <UIButton
                        v-for="btn in popup.buttons"
                        :key="btn.type"
                        :name="btn.label"
                        @click="popup.close(btn.type, btn.type)"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { usePopupStore } from '@/stores/popups';
    import UIButton from '@/components/ui/Button.vue';

    const popup = usePopupStore();
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
            min-width: 300px;
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
                text-align: center;
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
