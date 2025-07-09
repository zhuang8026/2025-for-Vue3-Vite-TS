// stores/user.ts
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
    state: () => ({
        token: '',
        profile: null as null | { id: string; name: string; email: string },
    }),

    actions: {
        setToken(token: string) {
            this.token = token;
        },
        setProfile(profile: { id: string; name: string; email: string }) {
            this.profile = profile;
        },
        logout() {
            this.token = '';
            this.profile = null;
        },
    },

    persist: true, // 持久化狀態
});
