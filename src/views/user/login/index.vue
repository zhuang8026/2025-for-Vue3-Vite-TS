<template>
    <div class="auth-container">
        <div class="auth-card">
            <!-- <h2 class="auth-title">登入</h2> -->

            <form @submit.prevent="handleSubmit">
                <div class="form-group">
                    <label for="username">帳號</label>
                    <input
                        id="username"
                        v-model="form.username"
                        type="text"
                        placeholder="請輸入帳號"
                        autocomplete="username"
                        required
                        @input="e => checkAccount((e.target as HTMLInputElement).value)"
                    />
                </div>

                <div class="form-group" v-if="showPWD">
                    <label for="password">密碼</label>
                    <div class="password-body">
                        <input
                            id="password"
                            v-model="form.password"
                            :type="eyeStatus ? 'text' : 'password'"
                            placeholder="請輸入密碼"
                            autocomplete="current-password"
                            required
                        />
                        <EyeHide class="svg-pwd" @click="eyesToggle" v-if="eyeStatus" />
                        <EyeOpen class="svg-pwd" @click="eyesToggle" v-else />
                    </div>
                </div>

                <br />
                <UIButton name="送出" :disabled="isdisabled" @click="handleSubmit" />

                <div class="forget-pwd">
                    <a href="#" class="link" @click.prevent="onForgotPassword">忘記密碼？</a>
                </div>
            </form>
        </div>

        <CustomPopups
            ref="popupRef"
            :title="popupMessage.title"
            :message="popupMessage.message"
            :buttons="[
                // { type: 'cancel', label: 'Cancel' },
                { type: 'confirm', label: 'Confirm' },
            ]"
            @confirm="onConfirm"
            @cancel="onCancel"
        />
    </div>
</template>
<script setup lang="ts">
    import { reactive, ref, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';

    // utils
    import { setCookie } from '@/utils/cookie';
    import { openLoading, closeLoading } from '@/utils/useLoading';

    // api
    import { login } from '@/api/apiClient';

    // components
    import UIButton from '@/components/ui/Button.vue';
    import CustomPopups from '@/components/global/popups/CustomPopups.vue';

    // svg
    import EyeOpen from '@/assets/images/eye-open.svg';
    import EyeHide from '@/assets/images/eye-hide.svg';

    const router = useRouter();

    const form = reactive({
        username: 'Asd@iii.org.tw',
        password: 'Enargy17885@',
        remember: false,
    });
    const popupMessage = reactive({
        title: '',
        message: '',
    });

    const eyeStatus = ref(false);
    const showPWD = ref(false);
    const isdisabled = ref(true);
    const popupRef = ref();

    const onForgotPassword = () => {
        alert('忘記密碼點擊！可跳轉到重設頁面');
    };

    const checkAccount = (account: any) => {
        // 驗證是否為 Email 格式
        const iAccount = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);

        showPWD.value = iAccount;
    };

    const checkBtnDisabled = (form: any) => {
        // 驗證 用戶是否都有輸入帳密
        let disabled = form.username != '' && form.password != '';
        isdisabled.value = !disabled;
    };

    const eyesToggle = () => {
        eyeStatus.value = !eyeStatus.value;
    };

    const onConfirm = (e: string) => {
        console.log(e);
    };

    const onCancel = (e: string) => {
        console.log(e);
    };

    // call api
    const handleSubmit = async () => {
        openLoading();
        const data = {
            userId: form.username,
            userPwd: form.password,
        };
        try {
            let res = await login(data);
            console.log('login:', res);
            if (res.code == 200) {
                setCookie('token', res.data.token);
                router.push('/');
            } else {
                popupMessage.title = '登入失敗';
                popupMessage.message = res.message;
                popupRef.value?.show();
            }
        } catch (err: any) {
            popupMessage.title = '登入失敗';
            popupMessage.message = err.message || '未知錯誤';
            popupRef.value?.show();
        }
        await closeLoading();
    };

    watch(
        () => form,
        (now, before) => {
            checkBtnDisabled(now);
        },
        {
            deep: true,
        }
    );

    // 類似 react useEffect
    onMounted(() => {
        console.log('✅ 元件已掛載');
        checkAccount(form.username);
        checkBtnDisabled(form);
    });
</script>
<style scoped lang="scss" src="./login.scss"></style>
