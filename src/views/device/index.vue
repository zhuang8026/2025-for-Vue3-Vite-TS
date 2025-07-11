<template>
    <div class="dashboard">
        <div class="power-tracking">
            <div class="tracking-title">
                <h2>用電追蹤</h2>
                <span>2024-06-01 更新</span>
            </div>
            <div class="tracking-content">
                <div class="setting">
                    <div class="icon_setting">
                        <div class="icon">
                            <Edit class="eidt-icon" />
                        </div>
                        <h3>設定目標</h3>
                    </div>

                    <div class="content">
                        <div class="number">
                            300
                            <span>度</span>
                        </div>
                        <span>・不含社區公共電費・</span>
                    </div>
                </div>

                <div class="use-energy">
                    <div class="chart">
                        <div class="icon_setting">
                            <div class="icon">
                                <Notification class="nonfiction-icon" />
                            </div>
                            <p>本月累積</p>
                        </div>
                        <div class="doughnutChart">
                            <DoughnutChart
                                type="month"
                                value="419.0"
                                total="340.0"
                                compareValue="-2.0"
                            />
                        </div>
                    </div>
                    <!-- 
                    <div class="process-items">
                        <div>
                            <div class="process-header">
                                <p>昨日用電量</p>
                                <span class="value">4度</span>
                            </div>
                            <div class="process"></div>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { useRouter } from 'vue-router';
    // components
    import DoughnutChart from '@/components/ui/DoughnutChart.vue';
    // svg
    import Edit from '@/assets/images/edit.svg';
    import Notification from '@/assets/images/notification.svg';

    const router = useRouter();

    function logout() {
        localStorage.removeItem('token');
        router.push('/login');
    }
</script>

<style lang="scss" scoped>
    @use '@/assets/scss/_forward' as *;
    .dashboard {
        padding: $width;
        .tracking-title {
            width: 100%;
            display: flex;
            align-items: end;
            margin-bottom: 1rem;
            h2 {
                font-size: 1.2rem;
                font-weight: bold;
                margin-right: 0.5rem;
            }
            span {
                font-size: 0.8rem;
            }
        }
        .tracking-content {
            display: flex;
            // grid-gap: 1rem;
            // gap: 1rem;
            // grid-template-columns: repeat(2, 1fr);

            .setting {
                position: relative;
                background: $deep2_blue;
                border-radius: 1rem;
                color: $white;

                display: flex;
                justify-content: center;
                align-items: center;

                width: 200px;
                height: 200px;
                .icon_setting {
                    position: absolute;
                    top: 0.8rem;
                    left: 0.8rem;

                    display: flex;
                    align-items: center;
                    justify-content: center;

                    .icon {
                        width: 2rem;
                        height: 2rem;
                        border-radius: 2rem;
                        background-color: $white;
                        line-height: 2.6rem;
                        text-align: center;
                        margin-right: 0.5rem;

                        .eidt-icon {
                            fill: $deep2_blue;
                            width: 1.5rem;
                            height: 1.5rem;
                        }
                    }
                }
                .content {
                    .number {
                        font-size: 2rem;
                        font-weight: bold;
                        text-align: center;
                    }
                }
            }

            .use-energy {
                display: flex;
                background: $white;
                border-radius: 1rem;
                .chart {
                    position: relative;
                    padding: 1.5rem 0.8rem 0.8rem 0.8rem;
                    .icon_setting {
                        position: absolute;
                        top: 0.8rem;
                        left: 0.8rem;

                        display: flex;
                        justify-content: center;
                        align-items: center;
                        .icon {
                            width: 2rem;
                            height: 2rem;
                            border-radius: 2rem;
                            background-color: $deep2_blue;
                            line-height: 2.6rem;
                            text-align: center;
                            margin-right: 0.5rem;
                            .nonfiction-icon {
                                fill: $white;
                                width: 1.5rem;
                                height: 1.5rem;
                            }
                        }
                    }

                    .doughnutChart {
                    }
                }
            }
        }
    }
</style>
