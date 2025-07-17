<template>
    <div>
        <p>{{ props.message }}</p>
        <button @click="props.doSomething('124')">呼叫父元件的函式</button>
        <button @click="notifyParent">呼叫父元件的函式</button>
    </div>
</template>

<script setup lang="ts">
    // 元件要對外發送事件類型
    const emit = defineEmits(['childEvent', 'submit']);

    /*
    withDefaults: 提供預設值
    */
    const props = withDefaults(
        defineProps<{
            message?: string; // 定義類型
            doSomething?: (msg: string) => string; // 定義類型
        }>(),
        {
            message: 'aaa',
            doSomething: (msg: string) => msg,
        }
    );

    function notifyParent() {
        emit('childEvent', '子元件傳來的資料');
    }
</script>
