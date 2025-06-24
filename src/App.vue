<template>
    <Nav />
    <Header />
    <router-view />
    <Footer />
</template>

<script setup lang="ts">
    // import HelloWorld from './components/HelloWorld.vue'
    import Nav from '@/components/ui/Nav.vue';
    import Header from '@/components/ui/Header.vue';
    import Footer from '@/components/ui/Footer.vue';
</script>

<style scoped></style>
