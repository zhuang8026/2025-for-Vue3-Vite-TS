// src/stores/popupStore.ts
import { defineStore } from 'pinia';

interface PopupState {
    visible: boolean;
    title: string;
    buttons: {
        type: 'confirm' | 'cancel';
        label: string;
    }[];
    callbacks: {
        onConfirm?: (data?: any) => void;
        onCancel?: (data?: any) => void;
    };
}

export const useInputPopupsStore = defineStore('popupss', {
    state: (): PopupState => ({
        visible: false,
        title: '提示',
        buttons: [],
        callbacks: {},
    }),

    actions: {
        open({
            title,
            buttons,
            onConfirm,
            onCancel,
        }: {
            title: string;
            buttons?: {
                type: 'confirm' | 'cancel';
                label: string;
            }[];
            onConfirm?: (data?: any) => void;
            onCancel?: (data?: any) => void;
        }) {
            this.title = title;
            this.buttons = buttons ?? [
                { type: 'cancel', label: '取消' },
                { type: 'confirm', label: '確認' },
            ];
            this.visible = true;

            this.callbacks = { onConfirm, onCancel };
        },

        close(result: 'confirm' | 'cancel', data?: any) {
            this.visible = false;
            // 監聽用戶選擇按鈕類型
            result == 'confirm'
                ? this.callbacks.onConfirm?.(data)
                : this.callbacks.onCancel?.(data);
            // 按鈕與視窗一起銷毀
            this.callbacks = {};
        },
    },
});
