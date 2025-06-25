<template>
    <div>
        <h1>dashboard Page</h1>
        <button @click="getLogout">Logout</button>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    import { eraseCookie } from '@/utils/cookie';
    // api
    import { logout } from '@/api/apiClient';

    const router = useRouter();

    const getLogout = async () => {
        let res = await logout();
        console.log(res);
        if (res.code == 200) {
            eraseCookie('token');
            router.push('/login');
        }
    };
</script>
