<template>
    <main>
        <div style="height: 50vh" />
        <section class="fluid">
            <ul aria-hidden="true" :style="{ '--count': items.length }">
                <li v-for="(text, i) in items" :key="i" :style="{ '--i': i }">
                    {{ text }}
                </li>
            </ul>
            <h2 style="color: red; top: 80px;">
                <span aria-hidden="true">you can&nbsp;</span>
            </h2>
        </section>
        <section>
            <h2 style="color: red">fin.</h2>
        </section>
        <div style="height: 50vh" />
    </main>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    interface Config {
        theme: 'dark' | 'light' | 'system';
        animate: boolean;
        snap: boolean;
        start: number;
        end: number;
        debug: boolean;
    }

    const items = ref([
        'design.design.design.design.',
        'prototype.',
        'solve.',
        'build.',
        'develop.',
        'debug.',
        'Google offers a free service that lets you instantly translate text, phrases, and web pages between English and over 100 other languages.',
        'cook.',
        'ship.',
        'prompt.prompt.prompt.',
        'collaborate.',
        'create.',
        'inspire.',
        'follow.',
        'This free service from Google instantly translates words, phrases, and web pages between Simplified Chinese and over 100 other languages',
        'test.',
        'optimize.',
        'teach.',
        'visualize.',
        'transform.',
        'scale.',
        'do it.',
    ]);

    const config = ref<Config>({
        theme: 'dark',
        animate: true,
        snap: true,
        start: Math.floor(Math.random() * 100),
        end: Math.floor(Math.random() * 100) + 900,
        debug: false,
    });

    let itemsEls: HTMLElement[] = [];

    // 計算滾動進度（0~1）
    function getScrollProgress(startEl: HTMLElement, endEl: HTMLElement) {
        const offset = 80; // 基準點距離視窗頂部 80px

        const start = startEl.getBoundingClientRect().top + window.scrollY - offset;
        const end = endEl.getBoundingClientRect().top + window.scrollY - offset;
        const current = window.scrollY;
        return Math.min(Math.max((current - start) / (end - start), 0), 1);
    }

    function updateScrollAnimation() {
        if (!config.value.animate) return;

        const root = document.documentElement;
        const progress = getScrollProgress(itemsEls[0], itemsEls[itemsEls.length - 1]);

        // 色相變化
        const hue = config.value.start + (config.value.end - config.value.start) * progress;
        root.style.setProperty('--hue', hue.toString());

        // 控制每個 li 的透明度
        itemsEls.forEach((el, i) => {
            const itemProgress = progress * (itemsEls.length - 1) - i;
            const opacity = Math.max(0.2, 1 - Math.abs(itemProgress));
            el.style.opacity = opacity.toString();
        });

        requestAnimationFrame(updateScrollAnimation);
    }

    function updateThemeAndSettings() {
        const root = document.documentElement;
        root.dataset.theme = config.value.theme;
        root.dataset.animate = String(config.value.animate);
        root.dataset.snap = String(config.value.snap);
        root.dataset.debug = String(config.value.debug);
        root.style.setProperty('--start', String(config.value.start));
        root.style.setProperty('--hue', String(config.value.start));
        root.style.setProperty('--end', String(config.value.end));
    }

    onMounted(() => {
        itemsEls = Array.from(document.querySelectorAll<HTMLElement>('ul li'));
        updateThemeAndSettings();
        requestAnimationFrame(updateScrollAnimation);
    });
</script>

<style lang="scss">
    @layer stick {
        section:first-of-type {
            --font-level: 6;
            display: flex;
            line-height: 1.25;
            width: 100%;
            padding-left: 5rem;
        }
        section:last-of-type {
            min-height: 100vh;
            display: flex;
            place-items: center;
            width: 100%;
            justify-content: center;

            h2 {
                --font-level: 6;
            }
        }
        section:first-of-type h2 {
            position: sticky;
            top: 0;
            font-size: inherit;
            margin: 0;
            display: inline-block;
            height: fit-content;
            font-weight: 600;
        }
        ul {
            width: 300px;
            font-weight: 600;
            padding-inline: 0;
            margin: 0;
            list-style-type: none;
        }

        [data-snap='true'] {
            scroll-snap-type: y proximity;

            li {
                scroll-snap-align: center;
            }
        }
    }

    @layer base {
        :root {
            --font-size-min: 14;
            --font-size-max: 20;
            --font-ratio-min: 1.1;
            --font-ratio-max: 1.33;
            --font-width-min: 375;
            --font-width-max: 1500;
        }

        html {
            color-scheme: light dark;
        }

        [data-theme='light'] {
            color-scheme: light only;
        }

        [data-theme='dark'] {
            color-scheme: dark only;
        }

        :where(.fluid) {
            --fluid-min: calc(
                var(--font-size-min) * pow(var(--font-ratio-min), var(--font-level, 0))
            );
            --fluid-max: calc(
                var(--font-size-max) * pow(var(--font-ratio-max), var(--font-level, 0))
            );
            --fluid-preferred: calc(
                (var(--fluid-max) - var(--fluid-min)) /
                    (var(--font-width-max) - var(--font-width-min))
            );
            --fluid-type: clamp(
                (var(--fluid-min) / 16) * 1rem,
                ((var(--fluid-min) / 16) * 1rem) -
                    (((var(--fluid-preferred) * var(--font-width-min)) / 16) * 1rem) +
                    (var(--fluid-preferred) * var(--variable-unit, 100vi)),
                (var(--fluid-max) / 16) * 1rem
            );
            font-size: var(--fluid-type);
        }

        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border-width: 0;
        }
    }
</style>
