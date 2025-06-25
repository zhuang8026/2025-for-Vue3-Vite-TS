<!-- src/components/GlobalLoading.vue -->
<template>
    <transition name="fade">
        <div v-if="visible" class="loading-overlay">
            <div class="spinner"></div>
        </div>
    </transition>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const visible = ref(false);

    // 提供方法讓外部可以控制
    defineExpose({
        show: () => (visible.value = true),
        hide: () => (visible.value = false),
    });
</script>

<style scoped>
    .loading-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.5);
        z-index: 9999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .spinner {
        width: 50px;
        height: 50px;
        border: 6px solid #fff;
        border-top-color: transparent;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }
    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
