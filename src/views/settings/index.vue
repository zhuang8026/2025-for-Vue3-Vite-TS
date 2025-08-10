<template>
    <div class="content">
        <div
            class="power-manage-card"
            :class="device.connectionStatus == '1' ? 'linked' : 'unlinked'"
            v-for="(device, index) in deviceList.scheduleDevices"
            :key="index"
        >
            <div class="info">
                <h2 class="title mb-5">{{ device.devName }}</h2>
                <h3 class="serial mb-5">{{ device.devId }}</h3>
                <div class="status mb-5">
                    <div class="connect">
                        {{ device.connectionStatus == '1' ? '連線中' : '已斷線' }}
                    </div>
                    <div class="power">
                        {{ device.activePower != null ? device.activePower : '0.0' }} W
                    </div>
                    <div class="schedule">
                        {{ device.schedulesCount ? device.schedulesCount : 0 }} 項目排程執行中
                    </div>
                </div>
            </div>
            <div class="switch-items">
                <label class="switch" :for="device.devId">
                    <input
                        type="checkbox"
                        :id="device.devId"
                        :name="device.devId"
                        :checked="device.powerStatus == '1'"
                        @click="changeSwitch(device.devId, device.powerStatus)"
                    />
                    <span class="slider round"></span>
                </label>

                <button>排程管理</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { reactive, ref, onMounted, watch } from 'vue';
    import { useRouter } from 'vue-router';

    // api
    import { cloudRemote, deviceOnOff } from '@/api/apiClient';

    // utils
    import { openLoading, closeLoading } from '@/utils/useLoading';
    import { string } from '@tensorflow/tfjs';

    const router = useRouter();

    const deviceList = reactive<{
        scheduleDevices: {
            devName: string;
            devId: string;
            connectionStatus: string;
            powerStatus: string;
            activePower: string;
            scheduleInfoList: [];
            schedulesCount: any;
        }[];
    }>({ scheduleDevices: [] });

    // switch on and off
    const changeSwitch = async (deviceId: string, onOff: string) => {
        console.log(deviceId, onOff);
        let newOnOff = onOff == '1' ? '0' : '1';

        // 找到指定設備
        const targetDevice = deviceList.scheduleDevices.find(d => d.devId === deviceId);

        // 開始切換
        if (targetDevice) {
            targetDevice.powerStatus = newOnOff;
        }

        // 開始call api
        try {
            await postAPIdeviceOnOff(deviceId, newOnOff);
        } catch (err: any) {
            // 失敗，回復舊狀態
            if (targetDevice) {
                targetDevice.powerStatus = onOff;
            }
            console.error('切換失敗:', err);
        }
    };

    // api
    const getAPIcloudRemote = async () => {
        openLoading();

        try {
            let res = await cloudRemote();
            console.log('cloudRemote:', res);
            if (res.code == 200) {
                // 清空原本的陣列再用 push 填入新資料
                // deviceList.splice(0, deviceList.length, ...res.data.scheduleDevices);
                // deviceList.push(...res.data.scheduleDevices);
                deviceList.scheduleDevices = [...res.data.scheduleDevices];
            }
        } catch (err: any) {
            console.log(err.message);
        }
        setTimeout(() => {
            closeLoading();
        }, 1000);
    };

    const postAPIdeviceOnOff = async (deviceId: string, onOff: string) => {
        openLoading();
        try {
            let res = await deviceOnOff({ deviceId, onOff });
            console.log('deviceOnOff:', res);
            if (res.code == 200) {
                console.log('切換成功', deviceList);
            }
        } catch (err: any) {
            console.log(err.message);
        }
        setTimeout(() => {
            closeLoading();
        }, 1000);
    };

    onMounted(() => {
        console.log('✅ 元件已掛載');
        getAPIcloudRemote();
    });
</script>

<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;

    .content {
        display: grid;
        grid-gap: 1rem;
        gap: 1rem;
        grid-template-columns: repeat(3, 1fr);
        padding: 1rem;
    }
    .power-manage-card {
        max-width: auto;
        height: auto;
        padding: 0.6rem;
        background-color: $deep_white;
        border-radius: 1rem;
        box-shadow: 2px 2px 6px $shadow;
        .info {
            .title {
                font-size: 1.2rem;
            }
            .serial {
                font-size: 0.85rem;
            }
            .status {
                font-size: 0.85rem;
            }
        }
    }

    .switch-items {
        display: flex;
        justify-content: space-between;
        align-items: center;
        // 開關
        .switch {
            position: relative;
            display: inline-block;
            width: 3rem;
            height: 1.5rem;
            input {
                opacity: 0;
                width: 0;
                height: 0;

                &:checked + .slider {
                    background-color: $safe;
                }

                &:focus + .slider {
                    box-shadow: 0 0 1px $safe;
                }

                &:checked + .slider:before {
                    -webkit-transform: translateX(1.5rem);
                    -ms-transform: translateX(1.5rem);
                    transform: translateX(1.5rem);
                }
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                border-radius: 3rem;
                -webkit-transition: 0.4s;
                transition: 0.4s;

                &:before {
                    position: absolute;
                    content: '';
                    height: 1rem;
                    width: 1rem;
                    left: 4px;
                    bottom: 4px;
                    background-color: white;
                    -webkit-transition: 0.4s;
                    transition: 0.4s;
                }
            }

            /* Rounded sliders */
            .round {
                border-radius: 3rem;
                &:before {
                    border-radius: 50%;
                }
            }
        }

        // 按鈕
        button {
            font-size: 0.85rem;
            border-radius: 3rem;
            padding: 0.5rem;
            cursor: pointer;
            &:active {
                color: $white;
                background-color: $safe;
            }
        }
    }

    .mb-5 {
        margin-bottom: 0.5rem;
    }

    .linked {
        border: 1px dashed $safe;
    }

    .unlinked {
        border: 1px dashed $danger;
    }
</style>
