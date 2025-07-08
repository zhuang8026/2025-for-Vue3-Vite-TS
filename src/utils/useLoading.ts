// 從 vue 裡面匯入 createApp，這是用來創建一個 Vue 應用的
import { createApp } from 'vue';
// 匯入 Vue 裡面的 App 型別（這只是用來讓 TypeScript 檢查而已）
import type { App } from 'vue';
import GlobalLoading from '@/components/ui/Loading.vue';

let instance: App<Element> | null = null; // 創建 空Vue-dom
let loadingRef: any = null; // 操作元件自身的方法

export function openLoading() {
    if (!instance) {
        const div = document.createElement('div'); // 建立div
        document.body.appendChild(div); // 插入 body

        instance = createApp(GlobalLoading); // 將loading掛載到Vue中
        loadingRef = instance.mount(div); // 將 instance 裝到 div 上
    }

    loadingRef?.show?.();
}

export function closeLoading() {
    loadingRef?.hide?.();
}
