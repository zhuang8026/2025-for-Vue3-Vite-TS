<template>
    <Nav />
    <Header />
    <router-view />
    <Footer />
</template>

<script setup lang="ts">
    // import HelloWorld from './components/HelloWorld.vue'
    import Nav from './components/AppNav.vue'
    import Header from './components/AppHeader.vue'
    import Footer from './components/AppFooter.vue'
</script>

<style scoped>
    /* .logo {
        height: 6em;
        padding: 1.5em;
        will-change: filter;
        transition: filter 300ms;
    }
    .logo:hover {
        filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.vue:hover {
        filter: drop-shadow(0 0 2em #42b883aa);
    } */
</style>
