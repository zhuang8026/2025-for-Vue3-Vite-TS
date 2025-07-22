<template>
    <div>
        <h1>dashboard Page</h1>
        <p>{{ name }}, {{ age }}</p>
        <p>{{ user.name }}, {{ user.age }}</p>
        <p>{{ user }}</p>
        <p>{{ user2 }}</p>
    </div>
</template>

<script setup lang="ts">
    import { ref, reactive, computed, watch, watchEffect, onMounted } from 'vue';

    const name = ref<string>('William');
    const age = ref<number>(9999);
    const age2 = ref<number>(1);

    const user = reactive({
        name: 'Alex1',
        age: 8888,
    });

    const user2 = ref<{
        name: string;
        age: number;
    }>({
        name: 'Alex2',
        age: 8888,
    });

    const total = computed(() => age.value + age2.value);

    watch(name, (newVal, oldVal) => {
        console.log(newVal, oldVal);
    });

    watch(
        name,
        (newVal, oldVal) => {
            console.log(newVal, oldVal);
        },
        { immediate: true }
    );

    watch([name, age], (nameVal, ageVal) => {
        console.log(nameVal, ageVal);
    });

    watchEffect(() => {
        console.log(age.value, age2.value);
        console.log(user.name, user.age);
    });

    onMounted(() => {
        setTimeout(() => {
            let list = {
                name: 'Billiam',
                age: 6611,
            };
            // user = list;
            user2.value = list;
        }, 1000);
    });
</script>
