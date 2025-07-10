<template>
    <div class="dashboard">
        <div class="power-tracking">
            <div class="tracking-title">
                <h2>用電追蹤</h2>
            </div>
            <div class="tracking-content">
                <div class="setting"></div>
                <div class="use-energy"></div>
            </div>
        </div>
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
