<template>
    <main>
        <div style="height: 50vh" />
        <section class="content fluid">
            <ul aria-hidden="true" :style="{ '--count': items.length }">
                <li v-for="(text, i) in items" :key="i" :style="{ '--i': i }">
                    {{ text }}
                </li>
            </ul>
            <h2 style="color: red">
                <span aria-hidden="true">you can&nbsp;</span>
                <span class="sr-only">you can ship things.</span>
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
    // import { Pane } from 'tweakpane';
    import gsap from 'gsap';
    import ScrollTrigger from 'gsap/ScrollTrigger';

    interface Config {
        theme: 'dark' | 'light' | 'system';
        animate: boolean;
        snap: boolean;
        start: number;
        end: number;
        scroll: boolean;
        debug: boolean;
    }

    const items = ref([
        'design.',
        'prototype.',
        'solve.',
        'build.',
        'develop.',
        'debug.',
        'learn.',
        'cook.',
        'ship.',
        'prompt.',
        'collaborate.',
        'create.',
        'inspire.',
        'follow.',
        'innovate.',
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
        start: gsap.utils.random(0, 100, 1),
        end: gsap.utils.random(900, 1000, 1),
        scroll: true,
        debug: false,
    });

    let itemsEls: HTMLElement[];
    let scrollerScrub: ScrollTrigger;
    let dimmerScrub: ScrollTrigger;
    let chromaEntry: gsap.core.Tween;
    let chromaExit: gsap.core.Tween;

    const update = () => {
        document.documentElement.dataset.theme = config.value.theme;
        // document.documentElement.dataset.syncScrollbar = String(config.value.scroll);
        document.documentElement.dataset.animate = String(config.value.animate);
        document.documentElement.dataset.snap = String(config.value.snap);
        document.documentElement.dataset.debug = String(config.value.debug);
        document.documentElement.style.setProperty('--start', String(config.value.start));
        document.documentElement.style.setProperty('--hue', String(config.value.start));
        document.documentElement.style.setProperty('--end', String(config.value.end));

        if (!config.value.animate) {
            chromaEntry?.scrollTrigger?.disable(true, false);
            chromaExit?.scrollTrigger?.disable(true, false);
            dimmerScrub?.disable(true, false);
            scrollerScrub?.disable(true, false);
            gsap.set(itemsEls, { opacity: 1 });
            gsap.set(document.documentElement, { '--chroma': 0 });
        } else {
            gsap.set(itemsEls, { opacity: i => (i !== 0 ? 0.2 : 1) });
            dimmerScrub.enable(true, true);
            scrollerScrub.enable(true, true);
            chromaEntry.scrollTrigger?.enable(true, true);
            chromaExit.scrollTrigger?.enable(true, true);
        }
    };

    onMounted(() => {
        // const ctrl = new Pane({ title: 'Config', expanded: false });

        // ctrl.addBinding(config.value, 'animate', { label: 'Animate' });
        // ctrl.addBinding(config.value, 'snap', { label: 'Snap' });
        // ctrl.addBinding(config.value, 'start', { label: 'Hue Start', min: 0, max: 1000, step: 1 });
        // ctrl.addBinding(config.value, 'end', { label: 'Hue End', min: 0, max: 1000, step: 1 });
        // ctrl.addBinding(config.value, 'scroll', { label: 'Scrollbar' });
        // ctrl.addBinding(config.value, 'debug', { label: 'Debug' });
        // ctrl.addBinding(config.value, 'theme', {
        //     label: 'Theme',
        //     options: { System: 'system', Light: 'light', Dark: 'dark' },
        // });

        // ctrl.on('change', update);

        if (!CSS.supports('(animation-timeline: scroll()) and (animation-range: 0% 100%)')) {
            gsap.registerPlugin(ScrollTrigger);
            itemsEls = gsap.utils.toArray<HTMLElement>('ul li');

            gsap.set(itemsEls, { opacity: i => (i !== 0 ? 0.2 : 1) });

            const dimmer = gsap
                .timeline()
                .to(itemsEls.slice(1), { opacity: 1, stagger: 0.5 })
                .to(itemsEls.slice(0, itemsEls.length - 1), { opacity: 0.2, stagger: 0.5 }, 0);

            dimmerScrub = ScrollTrigger.create({
                trigger: itemsEls[0],
                endTrigger: itemsEls[itemsEls.length - 1],
                start: 'center center',
                end: 'center center',
                animation: dimmer,
                scrub: 0.2,
            });

            const scroller = gsap
                .timeline()
                .fromTo(
                    document.documentElement,
                    { '--hue': config.value.start },
                    { '--hue': config.value.end, ease: 'none' }
                );

            scrollerScrub = ScrollTrigger.create({
                trigger: itemsEls[0],
                endTrigger: itemsEls[itemsEls.length - 1],
                start: 'center center',
                end: 'center center',
                animation: scroller,
                scrub: 0.2,
            });

            chromaEntry = gsap.fromTo(
                document.documentElement,
                { '--chroma': 0 },
                {
                    '--chroma': 0.3,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: itemsEls[0],
                        start: 'center center+=40',
                        end: 'center center',
                    },
                }
            );

            chromaExit = gsap.fromTo(
                document.documentElement,
                { '--chroma': 0.3 },
                {
                    '--chroma': 0,
                    ease: 'none',
                    scrollTrigger: {
                        scrub: 0.2,
                        trigger: itemsEls[itemsEls.length - 2],
                        start: 'center center',
                        end: 'center center-=40',
                    },
                }
            );
        }

        update();
    });
</script>

<style lang="scss">
    // @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    // @import url('https://unpkg.com/normalize.css') layer(normalize);
    // @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
    // @import url('https://unpkg.com/normalize.css') layer(normalize);

    @layer normalize, base, demo, stick, effect, srollbar, debug;

    @layer debug {
        [data-debug='true'] li {
            outline: 0.05em dashed currentColor;
        }
        [data-debug='true'] :is(h2, li:last-of-type) {
            outline: 0.05em dashed canvasText;
        }
    }

    // @layer scrollbar {
    //     @property --hue {
    //         initial-value: 0;
    //         syntax: '<number>';
    //         inherits: false;
    //     }
    //     @property --chroma {
    //         initial-value: 0;
    //         syntax: '<number>';
    //         inherits: true;
    //     }

    //     [data-sync-scrollbar='true'] {
    //         scrollbar-color: oklch(var(--lightness) var(--chroma) var(--hue)) #0000;
    //     }
    //     @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
    //         [data-sync-scrollbar='true'][data-animate='true'] {
    //             timeline-scope: --list;
    //             scrollbar-color: oklch(var(--lightness) var(--chroma, 0) var(--hue)) #0000;
    //             animation-name: change, chroma-on, chroma-off;
    //             animation-fill-mode: both;
    //             animation-timing-function: linear;
    //             /* animation-timeline: scroll(root); */
    //             animation-range: entry 50% exit 50%, entry 40% entry 50%, exit 30% exit 40%;
    //             animation-timeline: --list;
    //             ul {
    //                 view-timeline: --list;
    //             }
    //         }
    //     }

    //     @keyframes change {
    //         to {
    //             --hue: var(--end);
    //         }
    //     }
    //     @keyframes chroma-on {
    //         to {
    //             --chroma: 0.3;
    //         }
    //     }
    //     @keyframes chroma-off {
    //         to {
    //             --chroma: 0;
    //         }
    //     }
    // }

    // @layer effect {
    //     :root {
    //         --start: 0;
    //         --end: 360;
    //         --lightness: 65%;
    //         --base-chroma: 0.3;
    //     }
    //     [data-theme='dark'] {
    //         --lightness: 75%;
    //     }
    //     [data-theme='light'] {
    //         --lightness: 65%;
    //     }
    //     @media (prefers-color-scheme: dark) {
    //         --lightness: 75%;
    //     }
    //     ul {
    //         --step: calc((var(--end) - var(--start)) / (var(--count) - 1));
    //     }
    //     li:not(:last-of-type) {
    //         color: oklch(
    //             var(--lightness) var(--base-chroma) calc(var(--start) + (var(--step) * var(--i)))
    //         );
    //     }

    //     @supports (animation-timeline: scroll()) and (animation-range: 0% 100%) {
    //         [data-animate='true'] {
    //             li {
    //                 opacity: 0.2;
    //                 animation-name: brighten;

    //                 &:first-of-type {
    //                     --start-opacity: 1;
    //                 }
    //                 &:last-of-type {
    //                     --brightness: 1;
    //                     --end-opacity: 1;
    //                 }
    //                 animation-fill-mode: both;
    //                 animation-timing-function: linear;
    //                 animation-range: cover calc(50% - 1lh) calc(50% + 1lh);
    //                 animation-timeline: view();
    //             }
    //         }

    //         @keyframes brighten {
    //             0% {
    //                 opacity: var(--start-opacity, 0.2);
    //             }
    //             50% {
    //                 opacity: 1;
    //                 filter: brightness(var(--brightness, 1.2));
    //             }
    //             100% {
    //                 opacity: var(--end-opacity, 0.2);
    //             }
    //         }
    //     }
    // }

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
            // top: calc(50% - 0.5lh);
            top: 0;
            font-size: inherit;
            margin: 0;
            display: inline-block;
            height: fit-content;
            font-weight: 600;
        }
        ul {
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

        // h2,
        // li:last-of-type {
        //     background: linear-gradient(
        //         canvasText 50%,
        //         color-mix(in oklch, canvas, canvasText 25%)
        //     );
        //     background-clip: text;
        //     color: #0000;
        // }
    }

    // @layer demo {
    //     header {
    //         min-height: 100vh;
    //         display: flex;
    //         place-items: center;
    //         width: 100%;
    //         padding-inline: 5rem;
    //     }

    //     footer {
    //         padding-block: 2rem;
    //         opacity: 0.5;
    //     }

    //     h1 {
    //         --font-size-min: 24;
    //         --font-level: 8;
    //         text-wrap: pretty;
    //         line-height: 0.8;
    //         margin: 0;
    //         background: linear-gradient(canvasText 60%, color-mix(in oklch, canvas, canvasText));
    //         background-clip: text;
    //         color: #0000;
    //     }
    // }

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

        .bear-link {
            color: canvasText;
            position: fixed;
            top: 1rem;
            left: 1rem;
            width: 48px;
            aspect-ratio: 1;
            display: grid;
            place-items: center;
            opacity: 0.8;
        }

        :where(.x-link, .bear-link):is(:hover, :focus-visible) {
            opacity: 1;
        }

        .bear-link svg {
            width: 75%;
        }

        /* Utilities */
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

    div.tp-dfwv {
        position: fixed;
    }
</style>
