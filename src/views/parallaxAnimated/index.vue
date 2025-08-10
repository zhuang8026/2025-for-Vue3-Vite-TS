<template>
    <div class="content">
        <!-- 左側文字 -->
        <div class="text-list" ref="textList" @scroll="onTextScroll">
            <ul>
                <li
                    v-for="(item, index) in textItems"
                    :key="index"
                    :class="{ active: activeIndex === index }"
                    @click="scrollToIndex(index, 'text')"
                >
                    {{ item }}
                </li>
            </ul>
        </div>

        <!-- 右側圖片 -->
        <div class="img-list" ref="imgList" @scroll="onImgScroll">
            <div
                v-for="(color, index) in colors"
                :key="index"
                class="img_demo"
                :class="color"
                @click="scrollToIndex(index, 'img')"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    const textItems = [
        '第一張圖片: 紅色',
        '第二張圖片: 藍色',
        '第三張圖片: 黃色',
        '第四張圖片: 綠色',
        '第五張圖片: 灰色',
    ];

    const colors = ['red', 'blue', 'orange', 'green', 'gray'];

    const activeIndex = ref(0);

    const textList = ref<HTMLElement | null>(null);
    const imgList = ref<HTMLElement | null>(null);

    const itemHeightText = 200; // 每個 li 高度
    const itemHeightImg = 500; // 每個圖片高度

    let lockTextScroll = false;
    let lockImgScroll = false;

    // 滾動同步核心
    function syncScroll(source: 'text' | 'img', targetIndex: number) {
        if (source === 'text') {
            lockImgScroll = true;
            imgList.value?.scrollTo({ top: targetIndex * itemHeightImg, behavior: 'smooth' });
            waitForScrollEnd(imgList.value!, targetIndex * itemHeightImg, () => {
                lockImgScroll = false;
            });
        } else {
            lockTextScroll = true;
            textList.value?.scrollTo({ top: targetIndex * itemHeightText, behavior: 'smooth' });
            waitForScrollEnd(textList.value!, targetIndex * itemHeightText, () => {
                lockTextScroll = false;
            });
        }
    }

    // 檢測滾動結束再解鎖
    function waitForScrollEnd(el: HTMLElement, targetTop: number, callback: () => void) {
        const check = () => {
            const diff = Math.abs(el.scrollTop - targetTop);
            if (diff < 1) {
                callback();
            } else {
                requestAnimationFrame(check);
            }
        };
        requestAnimationFrame(check);
    }

    // 文字滾動事件
    function onTextScroll() {
        if (lockTextScroll) return;
        const index = Math.round(textList.value!.scrollTop / itemHeightText);
        if (activeIndex.value !== index) {
            activeIndex.value = index;
            syncScroll('text', index);
        }
    }

    // 圖片滾動事件
    function onImgScroll() {
        if (lockImgScroll) return;
        const index = Math.round(imgList.value!.scrollTop / itemHeightImg);
        if (activeIndex.value !== index) {
            activeIndex.value = index;
            syncScroll('img', index);
        }
    }

    // 點擊切換（兩邊都滾到頂部）
    function scrollToIndex(index: number, type: 'text' | 'img') {
        activeIndex.value = index;

        if (type === 'text') {
            // 左側自身滾到頂
            lockTextScroll = true;
            textList.value?.scrollTo({ top: index * itemHeightText, behavior: 'smooth' });
            waitForScrollEnd(textList.value!, index * itemHeightText, () => {
                lockTextScroll = false;
            });

            // 同步右側圖片
            syncScroll('text', index);
        } else {
            // 右側自身滾到頂
            lockImgScroll = true;
            imgList.value?.scrollTo({ top: index * itemHeightImg, behavior: 'smooth' });
            waitForScrollEnd(imgList.value!, index * itemHeightImg, () => {
                lockImgScroll = false;
            });

            // 同步左側文字
            syncScroll('img', index);
        }
    }
</script>

<style scoped lang="scss">
    @use '@/assets/scss/_forward' as *;

    $content-height: 500px;

    .content {
        display: flex;
        width: 100%;
        height: $content-height;
        background-color: gainsboro;
    }

    /* 左側文字 scroll-snap */
    .text-list {
        width: 50%;
        height: 100%;
        overflow-y: auto;
        scroll-snap-type: y mandatory;

        ul {
            padding: 0;
            margin: 0;
            list-style: none;

            li {
                height: 200px;
                display: flex;
                align-items: center;
                padding-left: 20px;
                font-size: 18px;
                color: gray;
                cursor: pointer;
                transition: color 0.3s ease;
                scroll-snap-align: start;

                &.active {
                    color: red;
                    font-weight: bold;
                }
            }
        }
    }

    /* 右側圖片 scroll-snap */
    .img-list {
        width: 50%;
        height: 100%;
        overflow-y: auto;
        scroll-snap-type: y mandatory;

        .img_demo {
            width: 100%;
            height: 500px;
            flex-shrink: 0;
            scroll-snap-align: start;
        }

        .red {
            background-color: red;
        }
        .blue {
            background-color: blue;
        }
        .orange {
            background-color: orange;
        }
        .green {
            background-color: green;
        }
        .gray {
            background-color: gray;
        }
    }
</style>
