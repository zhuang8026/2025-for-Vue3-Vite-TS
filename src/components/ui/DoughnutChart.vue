<template>
    <div class="chart">
        <div class="chartBox">
            <div ref="chartRef" class="doughnutChart"></div>

            <div class="chartDot"></div>

            <div class="chartDesc">
                <div class="chartNumber">
                    <span>{{ value }}</span
                    >kwh
                </div>
            </div>
        </div>

        <div v-if="compareValue > 0" class="result">* 較去年同月多 {{ compareValue }} 度 *</div>

        <div v-else-if="compareValue !== 0" class="result">
            * 較去年同月少 {{ compareValue }} 度 *
        </div>

        <div v-if="type === 'month' && value - total > 0" class="result">
            * 超出目標設定 {{ value - total }} 度 *
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, watch } from 'vue';
    import { useI18n } from 'vue-i18n';
    import * as echarts from 'echarts';

    const props = defineProps({
        type: {
            type: String,
            default: '',
        },
        value: {
            type: Number,
            default: 100.0,
        },
        total: {
            type: Number,
            default: 200.0,
        },
        compareValue: {
            type: Number,
            default: 0,
        },
    });

    const { t } = useI18n();
    const chartRef: any = ref(null);
    let chartInstance: any = null;

    // 計算空白用電量
    const emptyValue = () => {
        const targetNumber = props.total * 1.2;
        return props.value >= targetNumber ? 0 : targetNumber - props.value;
    };

    const emptyDangerValue = () => {
        const dangerVal = props.value - props.total;
        return dangerVal < 0 ? 0 : props.total - dangerVal;
    };

    const initChart = () => {
        if (!chartRef.value) return;

        const Health = '#1d8bf9';
        const Warning = '#ff9d0b';
        const Danger = '#fc3a3a';
        const Normal = '#EBEEFA';

        chartInstance = echarts.getInstanceByDom(chartRef.value) || echarts.init(chartRef.value);
        chartInstance.clear();

        const outerSeries = [
            {
                value: props.value >= props.total ? props.total : props.value,
                name: '本月用電量',
                itemStyle: {
                    color: Health,
                    borderRadius: 20,
                    borderWidth: 0,
                },
            },
            {
                value:
                    props.value >= props.total * 1.2
                        ? props.total * 0.2
                        : props.value - props.total,
                name: '超出用電量',
                itemStyle: {
                    color: Warning,
                    borderRadius: 20,
                    borderWidth: 0,
                },
            },
            {
                value: emptyValue(),
                name: '未使用電量',
                itemStyle: {
                    color: '#EBEEFA',
                    borderRadius: 20,
                    borderWidth: 0,
                },
            },
        ];

        const innerSeries =
            props.value - props.total * 1.2 > 0
                ? [
                      {
                          value: props.value - props.total * 1.2,
                          name: '超出用電量',
                          itemStyle: {
                              color: Danger,
                              borderRadius: 20,
                              borderWidth: 0,
                          },
                      },
                      {
                          value: emptyDangerValue(),
                          name: '未使用電量',
                          itemStyle: {
                              color: Normal,
                              borderRadius: 20,
                              borderWidth: 0,
                          },
                      },
                  ]
                : [];

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: (params: any) => {
                    const tooltipDom = document.querySelector('.echarts-tooltip') as HTMLElement;
                    if (tooltipDom) {
                        tooltipDom.style.backgroundColor = params.color;
                    }
                    return `${params.name}: ${params.value}度 (${params.percent}%)`;
                },
                textStyle: {
                    fontSize: 16,
                },
            },
            dataZoom: {
                type: 'slider',
                show: false,
            },
            series: [
                {
                    type: 'pie',
                    radius: ['98%', '78%'],
                    data: outerSeries,
                    label: { show: false },
                    emphasis: {
                        scale: false,
                        itemStyle: {
                            color: 'inherit',
                            shadowBlur: 0,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            borderColor: 'inherit',
                            borderWidth: 0,
                        },
                    },
                },
                ...(innerSeries.length > 0
                    ? [
                          {
                              type: 'pie',
                              radius: ['60%', '74%'],
                              data: innerSeries,
                              label: { show: false },
                              emphasis: {
                                  scale: false,
                                  itemStyle: {
                                      color: 'inherit',
                                      shadowBlur: 0,
                                      shadowOffsetX: 0,
                                      shadowOffsetY: 0,
                                      borderColor: 'inherit',
                                      borderWidth: 0,
                                  },
                              },
                          },
                      ]
                    : []),
            ],
        };

        chartInstance.setOption(option);
        chartInstance.resize();
    };

    onMounted(() => {
        initChart();

        chartRef.value.addEventListener(
            'mousewheel',
            (event: any) => {
                event.preventDefault();
            },
            { passive: true }
        );

        window.addEventListener('resize', () => {
            chartInstance?.resize();
        });
    });

    watch(
        () => [props.value, props.total, props.compareValue],
        () => {
            initChart();
        }
    );
</script>

<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;
    .chart {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .chartBox {
        position: relative;
        width: 200px;
        height: 200px;
    }
    .doughnutChart {
        width: 100%;
        height: 100%;
    }
    .chartDot {
        position: absolute;
        top: 30%;
        left: 9%;
        z-index: 3;
        width: 8px;
        height: 8px;
        border-radius: 100%;
        background-color: $black;
    }
    .chartDesc {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }
    .chartNumber span {
        font-size: 24px;
        font-weight: bold;
    }
    .result {
        margin-top: 10px;
        font-size: 14px;
    }
</style>
