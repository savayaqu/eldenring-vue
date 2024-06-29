import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        token: localStorage.getItem('api_token') || ''
    }),
    actions: {
        setToken(newToken) {
            this.token = newToken;
            if (newToken) {
                localStorage.setItem('api_token', newToken);
            } else {
                localStorage.removeItem('api_token');
            }
        }
    },
    getters: {
        isAuthenticated() {
            return !!this.token;
        }
    }
});
