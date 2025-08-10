import type { App } from 'vue';
import axios from 'axios';
import type { Method } from 'axios';

// utils
import { getCookie } from '@/utils/cookie';

const JAVA_SERVER = import.meta.env.VITE_API_JAVA_URL || '';
const PYTHON_SERVER = import.meta.env.VITE_API_PYTHON_URL || '';

const api = async (
    method: Method,
    url: string,
    data: any = {},
    type: 'json' | 'form' = 'json',
    auth: boolean = true, // 可選：是否帶 token
    py_server: boolean = false
): Promise<any> => {
    const headers: Record<string, string> = {};

    // 設定 Content-Type
    headers['Content-Type'] = type === 'form' ? 'multipart/form-data' : 'application/json';

    // 加入 token
    if (auth) {
        const token = getCookie('token');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    try {
        const response = await axios({
            method,
            url: py_server ? PYTHON_SERVER : JAVA_SERVER + url,
            headers,
            data: data,
        });

        return response.data;
    } catch (error: any) {
        const status = error?.response?.status ?? 500;
        const errData = error?.response?.data ?? { message: '未知錯誤' };

        console.error(`[API ERROR ${status}]`, errData);
        return Promise.reject({ status, ...errData });
    }
};

export default {
    install(app: App) {
        app.config.globalProperties.$axios = api;
    },
};

export { api };
