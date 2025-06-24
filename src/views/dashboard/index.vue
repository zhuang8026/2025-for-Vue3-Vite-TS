<template>
    <div>
        <h1>dashboard Page</h1>
        <button @click="logout">Logout</button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';

    const router = useRouter();

    function logout() {
        localStorage.removeItem('token');
        router.push('/login');
    }
</script>
