<template>
    <nav>
        <div class="sidebar">
            <div class="logo">
                <div class="icon"></div>
            </div>
            <div class="menu">
                <div class="m-list">帳號設定</div>
                <div class="m-list">會員充值</div>
                <div class="m-list">保固服務</div>
            </div>
        </div>
        <div class="history">
            <h3>導覽</h3>
            <router-link
                v-for="item in items"
                :key="item.name"
                :to="`${item.path}`"
                class="history-list"
                active-class="active"
                @click="clickNav(item.path, item.name)"
            >
                {{ item.name }}
            </router-link>
        </div>
        <div class="upgrade">
            <div class="u-list logout">
                <Star />
                升級方案
            </div>
            <div class="u-list text-xs">擁有更多最佳模型的存取權限</div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    import { useRouter } from 'vue-router';

    // pinia
    import { useHeaderStore } from '@/stores/header'; // header name

    // api
    // import { logout } from '@/api/apiClient';

    // utils
    // import { openLoading, closeLoading } from '@/utils/useLoading';
    // import { eraseCookie } from '@/utils/cookie';

    // svg
    import Star from '@/assets/images/star.svg';

    const items = ref([
        { name: '管理用電', path: '/' },
        { name: '用電追蹤', path: '/tracking' },
        { name: '訓練檢測', path: '/training' }, 
        { name: '視差滾動', path: '/parallaxAnimated' }, 
    ]);

    const header = useHeaderStore(); // header name

    const router = useRouter();

    const clickNav = (path: string, name: string) => {
        console.log(path);
        header.setHeader(name);
    };

    // const apiLogout = async () => {
    //     openLoading();
    //     let res = await logout();
    //     console.log(res);
    //     if (res.code == 200) {
    //         eraseCookie('token');
    //         router.push('/login');
    //         closeLoading();
    //     }
    // };
</script>
<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;
    nav {
        min-width: calc($width * 26);
        height: 100vh;
        background-color: $deep_white;
        font-size: $fs-14;
        box-shadow: 3px 0 20px $shadow;

        .sidebar {
            position: sticky;
            top: 0;
            padding: 0 $space;
            border-bottom: 1px $light_gray solid;
            .logo {
                padding: $space 0;
                .icon {
                    width: 30px;
                    height: 30px;
                    background: $light_blue;
                    border-radius: 50%;
                }
            }
            .menu {
                .m-list {
                    padding: calc($space / 2) 0;
                }
            }
        }

        .history {
            height: calc(100vh - 170px - 65px);
            overflow-x: hidden;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            color: $text;
            // padding: calc($space / 2) 0;

            h3 {
                color: $text_o5;
                padding: calc($space / 2) $space;
            }
            .history-list {
                margin: 0 calc($space / 2);
                padding: calc($space / 2) $space;
                border-radius: $space;
                color: $text;
            }

            .active {
                background-color: $black_o9;
            }
        }

        .upgrade {
            // position: sticky;
            // bottom: 0;
            background-color: $deep_white;
            border-top: 1px $light_gray solid;
            padding: 0 $space;
            .u-list {
                padding: calc($space / 3) 0;
            }
            .text-xs {
                font-size: $fs-12;
            }

            .logout {
                font-size: $fs-16;
                cursor: pointer;

                display: flex;
                align-items: center;
            }
        }
    }
</style>
