<template>
    <div class="d-layout">
        <Nav />

        <div class="d-layout-main">
            <Header />
            <slot />
            <Footer />
        </div>
    </div>
</template>

<script setup>
    import Nav from '@/components/ui/Nav.vue';
    import Header from '@/components/ui/Header.vue';
    import Footer from '@/components/ui/Footer.vue';
</script>

<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;
    .d-layout {
        display: flex;
        .d-layout-main {
            width: calc(100vw - ($width * 26));
            // background-color: #212121;
        }
    }
</style>
