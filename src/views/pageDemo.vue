<template>
    <div>
        <UiDemo
        @childEvent="demoClick" 
        message="testing
        " 
        :doSomething="handleChildCall" />
    </div>
</template>

<script setup lang="ts">
    import UiDemo from '@/components/ui/UiDemo.vue';

    // 子傳父
    const demoClick = (payload: string) => {
        console.log('收到子層資料', payload);
    };

    // 父傳子
    const handleChildCall = (msg: string) => {
        console.log(msg); // '124'
        return msg;
    };
</script>
