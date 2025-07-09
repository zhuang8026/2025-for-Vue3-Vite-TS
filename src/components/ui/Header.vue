<template>
    <header>
        <div class="title">用電追蹤</div>
        <div class="h-items">
            <div class="info" @click="">
                <Warning class="svg_icon" />
                提示
            </div>

            <div class="avatar-list">
                <div class="avatar" @click="clickAvatar">{{ userInfo?.name }}</div>

                <transition name="fade">
                    <div class="drop-down" v-if="showDropDown">
                        <div class="account">
                            <img src="" alt="" />
                            {{ userInfo?.id }}
                        </div>
                        <div class="drop-list">
                            <img src="" alt="" />
                            帳號設定
                        </div>
                        <div class="drop-list" @click="apiLogout()">
                            <img src="" alt="" />
                            登出
                        </div>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
    import { computed, reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';

    // api
    import { logout } from '@/api/apiClient';

    // utils
    import { openLoading, closeLoading } from '@/utils/useLoading';
    import { eraseCookie } from '@/utils/cookie';

    // pinia
    import { useUserStore } from '@/stores/user';

    // svg
    import Warning from '@/assets/images/warning.svg';

    const router = useRouter();
    const userStore = useUserStore();
    const showDropDown = ref(false);

    const userInfo = computed(() => {
        if (userStore.profile?.id) {
            let id = userStore.profile?.id;
            let name = id.substring(0, 2);
            let outPut = {
                id: id,
                name: name.toLocaleUpperCase(),
            };
            return outPut;
        }
    });

    const clickAvatar = () => {
        showDropDown.value = !showDropDown.value;
    };

    const apiLogout = async () => {
        openLoading();
        let res = await logout();
        console.log(res);
        if (res.code == 200) {
            eraseCookie('token'); // cookies 寫法
            userStore.logout(); // pinia 寫法
            router.push('/login');
            closeLoading();
        }
    };
</script>

<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;
    header {
        width: calc(100vw - $width * 26);
        padding: $width;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px $light_gray solid;

        .h-items {
            display: flex;
            align-items: center;
            .info {
                cursor: pointer;

                display: flex;
                align-items: center;
                justify-content: center;

                font-size: $fs-14;
                border-radius: $width;
                background: $black_o9;
                margin-right: 0.5rem;
                padding: calc($width / 2);
            }

            .avatar-list {
                position: relative;
                font-size: $fs-14;

                .avatar {
                    cursor: pointer;

                    width: calc($width * 2.8);
                    height: calc($width * 2.8);
                    border-radius: calc($width * 2.8);
                    line-height: 1.8rem;
                    text-align: center;
                    background: $black_o9;
                    font-size: $fs-12;
                }

                .drop-down {
                    position: absolute;
                    top: calc($width * 4);
                    right: 0;

                    min-width: calc($width * 20);
                    background: $deep_white;
                    border-radius: $width;
                    border: 1px solid $black_gray_o5;

                    padding: calc($width / 2);

                    .account {
                        font-size: $fs-14;
                        color: $text_o5;
                        padding: calc($width / 2);
                    }

                    .drop-list {
                        cursor: pointer;
                        padding: calc($width / 2);
                        border-radius: calc($width * 2);

                        &:hover {
                            background: $black_o9;
                        }
                    }
                }
            }
        }

        .svg_icon {
            width: calc($width * 1.6);
            margin-right: calc($width / 2);
        }
    }

    // 動畫
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s;
    }
    .fade-enter-from,
    .fade-leave-to {
        opacity: 0;
    }
</style>
