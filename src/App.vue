<template>
    <component :is="layout">
        <router-view />
    </component>
</template>

<script setup lang="ts">
    import { computed } from 'vue';
    import { useRoute } from 'vue-router';

    import DefaultLayout from '@/components/global/layouts/DefaultLayout.vue';
    import AuthLayout from '@/components/global/layouts/AuthLayout.vue';

    const route = useRoute();

    const layout = computed(() => {
        // computed 計算屬性 :根據其他的資料自動計算出來的屬性
        // 和 watch 的區別：
        // -> 組合資料 用 computed (可return
        // -> call api 用 watch (不可return
        switch (route.meta.layout) {
            case 'auth':
                return AuthLayout;
            case 'default':
            default:
                return DefaultLayout;
        }
    });
</script>
