// enum 映射
import { ENV } from '@/assets/enum/enum';
import { api } from '@/plugins/axios';

// API初始化設定
let apiENV = import.meta.env.VITE_ENV; //現在環境

/**
 * 登入
 * api working - 2025/william.C
 */
const login = async ({ userId, userPwd }: { userId: string; userPwd: string }) => {
    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('userPwd', userPwd);

    const url: string = apiENV === ENV.MOCK ? `apiLogin.json` : `/main/login`;

    const res = await api('POST', url, formData, 'form');
    return res;
};

/**
 * 登出
 * api working - 2025/william.C
 */
const logout = async () => {
    const formdata = new FormData();

    const url: string = apiENV === ENV.MOCK ? `apiLogout.json` : `/main/logout`;

    const res = await api('GET', url, formdata, 'form');
    return res;
};

/**
 * 取得管理用電
 * api working - 2025/william.C
 */
const cloudRemote = async () => {
    const url: string = apiENV === ENV.MOCK ? `apiCloudRemote.json` : `/main/cloud-remote`;

    const res = await api('GET', url, {}, 'json');
    return res;
};

/**
 * 取得管理用電
 * api working - 2025/william.C
 */
const deviceOnOff = async ({ deviceId, onOff }: { deviceId: string; onOff: string }) => {
    const formData = new FormData();
    formData.append('deviceId', deviceId);
    formData.append('onOff', onOff);

    const url: string = apiENV === ENV.MOCK ? `apiOnOff.json` : `/main/cloud-remote/on-off`;

    const res = await api('POST', url, {}, 'form');
    return res;
};

export { login, logout, cloudRemote, deviceOnOff };
