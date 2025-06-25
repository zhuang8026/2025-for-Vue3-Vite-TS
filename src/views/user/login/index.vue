<template>
    <div class="auth-container">
        <div class="auth-card">
            <h2 class="auth-title">{{ isLogin ? '登入' : '註冊帳號' }}</h2>

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">帳號</label>
                    <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        placeholder="請輸入帳號"
                        required
                    />
                </div>

                <div class="form-group">
                    <label for="password">密碼</label>
                    <input
                        id="password"
                        v-model="form.password"
                        type="password"
                        placeholder="請輸入密碼"
                        required
                    />
                </div>

                <div class="form-actions">
                    <label class="remember-me">
                        <input type="checkbox" v-model="form.remember" />
                        記住我
                    </label>

                    <a href="#" class="link" @click.prevent="onForgotPassword">忘記密碼？</a>
                </div>

                <button type="submit" class="btn btn-primary">
                    {{ isLogin ? '登入' : '註冊' }}
                </button>

                <div class="toggle-auth">
                    <span>
                        {{ isLogin ? '還沒有帳號？' : '已經有帳號了？' }}
                    </span>
                    <button type="button" class="btn btn-link" @click="toggleMode">
                        {{ isLogin ? '立即註冊' : '回到登入' }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';
    // utils
    import { setCookie } from '@/utils/cookie';
    import { openLoading, closeLoading } from '@/utils/useLoading';
    // api
    import { login } from '@/api/apiClient';

    const router = useRouter();

    const isLogin = ref(true);

    const form = reactive({
        username: 'billdavid50814@gmail.com',
        password: 'Enargy17885@',
        remember: false,
    });

    const toggleMode = () => {
        isLogin.value = !isLogin.value;
    };

    const onForgotPassword = () => {
        alert('忘記密碼點擊！可跳轉到重設頁面');
    };

    const handleSubmit = async () => {
        openLoading();
        const data = {
            userId: form.username,
            userPwd: form.password,
        };
        let res = await login(data);
        if (res.code == 200) {
            setCookie('token', res.data.token);
            router.push('/');
            alert(`${isLogin.value ? '登入' : '註冊'}成功！`);
            closeLoading();
        }
        console.log('login:', res);
    };
</script>
<style lang="scss" scoped src="./login.scss"></style>
