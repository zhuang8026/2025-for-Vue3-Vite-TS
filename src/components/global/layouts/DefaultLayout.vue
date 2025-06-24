<template>
    <div>
        <Header />
        <Nav />
        <slot />
        <Footer />
    </div>
</template>

<script setup>
    import Nav from '@/components/ui/Nav.vue';
    import Header from '@/components/ui/Header.vue';
    import Footer from '@/components/ui/Footer.vue';
</script>
