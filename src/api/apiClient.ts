// import qs from 'qs';
import { api } from '@/plugins/axios';

/**
 * 登入
 * api working - 2025/william.C
 */
const login = async ({ userId, userPwd }: { userId: string; userPwd: string }) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('userPwd', userPwd);

    const res = await api('post', '/main/login', formData, 'form');
    return res;
};

/**
 * 登出
 * api working - 2025/william.C
 */
const logout = async () => {
    const formdata = new FormData();
    const res = await api('GET', '/main/logout', formdata, 'form');
    return res;
};

export { login, logout };
