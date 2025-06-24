<template>
    <div>
        <h1>Login Page</h1>
        <button @click="login">Login</button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router'

    const router = useRouter()

    function login() {
        localStorage.setItem('token', 'your-token') // 模擬登入
        router.push('/')
    }
</script>
