<template>
    <nav>
        <div class="sidebar">
            <div class="logo">
                <div class="icon"></div>
            </div>
            <div class="menu">
                <div class="m-list">創建</div>
                <div class="m-list">搜尋</div>
                <div class="m-list">圖庫</div>
            </div>
        </div>
        <div class="history">
            <div class="h-list" v-for="item in items">OOOOOOOOOOOOOOOO</div>
        </div>
        <div class="upgrade">
            <div class="u-list">升級方案</div>
            <div class="u-list text-xs">擁有更多最佳模型的存取權限</div>
        </div>
    </nav>
</template>

<script setup lang="ts">
    import { reactive, ref } from 'vue';
    const items = ref([1, 2, 3, 4, 5, 6, 7, 8, 9, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
</script>
<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;
    nav {
        min-width: calc($width * 26);
        height: 100vh;
        padding: 0 $space;
        background-color: $black;
        overflow-y: auto;
        .sidebar {
            position: sticky;
            top: 0;
            background-color: $black;
            .logo {
                padding: $space 0;
                .icon {
                    width: 30px;
                    height: 30px;
                    background: $white;
                    border-radius: 50%;
                }
            }
            .menu {
                .m-list {
                    padding: $space/2 0;
                }
            }
        }

        .history {
            .h-list {
                padding: $space/2 0;
            }
        }

        .upgrade {
            position: sticky;
            bottom: 0;
            background-color: $black;
            border-top: 1px $light_gray solid;
            .u-list {
                padding: $space/3 0;
            }
            .text-xs {
                font-size: $text-xs;
            }
        }
    }
</style>
