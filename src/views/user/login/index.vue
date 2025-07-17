<template>
    <div class="auth-container">
        <div class="auth-card">
            <!-- <h2 class="auth-title">登入</h2> -->

            <form @submit.prevent="submitLogin">
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
                <UIButton name="送出" :disabled="isdisabled" @click="submitLogin" />

                <div class="forget-pwd">
                    <a href="#" class="link" @click.prevent="onForgotPassword">忘記密碼？</a>
                </div>
            </form>
        </div>
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

    // pinia
    import { useUserStore } from '@/stores/user'; // save user info
    import { usePopupStore } from '@/stores/popups'; // alert
    import { useInputPopupsStore } from '@/stores/inputPopups'; // alert

    // svg
    import EyeOpen from '@/assets/images/eye-open.svg';
    import EyeHide from '@/assets/images/eye-hide.svg';

    const router = useRouter();
    const userStore = useUserStore();
    const popup = usePopupStore(); // alert
    const inputPopup = useInputPopupsStore(); // alert

    const form = reactive({
        username: 'Asd@iii.org.tw',
        password: 'Enargy17885@',
        remember: false,
    });

    const eyeStatus = ref(false);
    const showPWD = ref(false);
    const isdisabled = ref(true);

    // 忘記密碼
    const onForgotPassword = () => {
        // alert('忘記密碼點擊！可跳轉到重設頁面');
        showForgetPopup('忘記密碼');
    };

    // 帳號 驗證
    const checkAccount = (account: any) => {
        // 驗證是否為 Email 格式
        const iAccount = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account);

        showPWD.value = iAccount;
    };

    // 按鈕點擊 驗證
    const checkBtnDisabled = (form: any) => {
        // 驗證 用戶是否都有輸入帳密
        let disabled = form.username != '' && form.password != '';
        isdisabled.value = !disabled;
    };

    // 顯示密碼
    const eyesToggle = () => {
        eyeStatus.value = !eyeStatus.value;
    };

    // 視窗
    const showPopup = (title: string, message: string) => {
        popup.open({
            title: title,
            message: message,
            buttons: [
                // { type: 'cancel', label: '刪除' },
                { type: 'confirm', label: '確認' },
            ],
            onConfirm: data => {
                console.log('使用者確認', data);
                // 執行刪除邏輯
            },
            // onCancel: () => {
            //     console.log('使用者取消');
            // },
        });
    };

    // 視窗
    const showForgetPopup = (title: string) => {
        inputPopup.open({
            title: title,
            onConfirm: data => {
                console.log('資料送出', data);
            },
            onCancel: data => {
                console.log('使用者取消', data);
            },
        });
    };

    // call api
    const submitLogin = async () => {
        openLoading();
        const data = {
            userId: form.username,
            userPwd: form.password,
        };
        try {
            let res = await login(data);
            console.log('login:', res);
            if (res.code == 200) {
                // cookies 範例
                setCookie('token', res.data.token);

                // pinia 範例
                userStore.setToken(res.data.token);
                userStore.setProfile({
                    id: res.data.userInfo.user_id,
                    name: res.data.userInfo.user_name,
                    email: res.data.userInfo.email,
                });

                router.push('/tracking');
            } else {
                showPopup('登入失敗', res.message);
            }
        } catch (err: any) {
            showPopup('登入失敗', err.message || '未知錯誤');
        }
        await closeLoading();
    };

    watch(
        () => form,
        (now, before) => {
            checkBtnDisabled(now);
        },
        {
            deep: true, // 監聽 form 整個物件（深層的監聽）
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
