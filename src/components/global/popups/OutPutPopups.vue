<template>
    <transition name="fade">
        <div v-if="popup.visible" class="popups-overlay">
            <div class="popups-body">
                <h2 class="popups-title">{{ popup.title }}</h2>
                <div class="form-group">
                    <input
                        id="email"
                        v-model="email"
                        type="text"
                        placeholder="請輸入帳號"
                        autocomplete="email"
                        required
                    />
                </div>

                <div class="popups-btns">
                    <UIButton
                        v-for="btn in popup.buttons"
                        :key="btn.type"
                        :name="btn.label"
                        @click="popup.close(btn.type, email)"
                    />
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    import { useInputPopupsStore } from '@/stores/inputpopups';
    import UIButton from '@/components/ui/Button.vue';

    const popup = useInputPopupsStore();

    const email = ref('');
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

            .form-group {
                margin: 1.2rem 0;

                label {
                    color: $text;
                    display: block;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                input {
                    color: $text;
                    width: 100%;
                    padding: 0.6rem 0.75rem;
                    border: 1px solid $light_gray;
                    border-radius: 0.5rem;
                    font-size: 1rem;
                    transition: 0.2s ease;

                    &:focus {
                        border-color: $light_blue;
                        outline: none;
                    }
                }
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
