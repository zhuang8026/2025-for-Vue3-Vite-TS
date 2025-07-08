import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import svgLoader from 'vite-svg-loader';

import path from 'path';

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
    console.log('start env:', mode); // 網頁不會顯示，會顯示 cmd 中

    return {
        base: './',
        plugins: [vue(), svgLoader()],
        resolve: {
            alias: [{ find: '@', replacement: path.resolve(__dirname, 'src') }],
        },
        // css: {
        //     preprocessorOptions: {
        //         scss: {
        //             additionalData: `@use "@/assets/scss/use/_index.scss" as *;`,
        //         },
        //     },
        // },
    };
});
