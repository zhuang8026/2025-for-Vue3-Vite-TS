<template>
    <div class="auth-layout">
        <slot />
        <Footer />
    </div>
</template>
<script setup>
    import Footer from '@/components/ui/Footer.vue';
</script>
<style lang="scss" scoped>
    @use '@/assets/scss/_forward' as *;

    .auth-layout {
        background: -webkit-radial-gradient(
                0% 100%,
                ellipse cover,
                rgba(75, 170, 153, 0.4) 10%,
                rgba(105, 200, 190, 0) 40%,
                rgba(26, 200, 191, 0.309) 90%
            ),
            linear-gradient(to bottom, rgba(57, 100, 219, 0.25) 0%, rgba(14, 88, 199, 0.4) 100%),
            linear-gradient(135deg, #365899 0%, #365899 100%);
    }
</style>
