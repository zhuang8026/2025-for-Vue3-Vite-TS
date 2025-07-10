// stores/user.ts
import { defineStore } from 'pinia';

export const useHeaderStore = defineStore('header', {
    state: () => ({
        name: '',
    }),

    actions: {
        setHeader(name: string) {
            this.name = name;
        },
    },

    persist: true, // 持久化狀態
});
