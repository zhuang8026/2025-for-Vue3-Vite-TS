<template>
    <div class="h-60"></div>
    <div class="box" ref="boxRef">
        <div class="container">
            <div
                class="scroll-area"
                ref="scrollArea"
                @scroll="onScroll"
                @mouseenter="focusScrollArea"
            >
                <div class="content">
                    <!-- 左側文字 -->
                    <div class="text-column">
                        <h1>我是TITLE</h1>
                        <div
                            v-for="(text, index) in texts"
                            :key="index"
                            :ref="el => (textRefs[index] = el)"
                            class="text-block"
                            :class="{ active: index === activeIndex }"
                            @click="isclick(index)"
                        >
                            {{ text }}
                        </div>
                    </div>

                    <!-- 右側色塊 -->
                    <div class="color-column">
                        <div
                            class="color-block"
                            :style="{ backgroundColor: colors[activeIndex] }"
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="h-100"></div>
</template>

<script setup>
    import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

    const boxRef = ref(null);

    const texts = [
        '第一段文字，高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短高度比較短',
        '第二段文字，稍微長一點點內容內容內容',
        '第三段文字，中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子中等長度的句子',
        '第四段文字，這是一個比較長的段落文字段落文字段落文字段落',
        '第五段文字，很短',
    ];

    const colors = ['red', 'orange', 'yellow', 'green', 'blue'];

    const activeIndex = ref(0);
    const textRefs = [];
    const scrollArea = ref(null);

    const hasScrollTop = ref(false);

    const isclick = num => {
        activeIndex.value = num;
        // 點擊時自動滾動到對應文字
        const target = textRefs[num];
        if (target && scrollArea.value) {
            scrollArea.value.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    const onScroll = () => {
        if (!scrollArea.value) return;
        const el = scrollArea.value;
        const scrollTop = el.scrollTop;
        const scrollHeight = el.scrollHeight;
        const clientHeight = el.clientHeight;

        // 1️⃣ 判斷哪個 index 最接近頂部
        let closestIndex = 0;
        let minDistance = Infinity;

        textRefs.forEach((el, idx) => {
            if (!el) return;
            const distance = Math.abs(el.offsetTop - scrollTop);
            if (distance < minDistance) {
                minDistance = distance;
                closestIndex = idx;
            }
        });

        activeIndex.value = closestIndex;

        // 2️⃣ 判斷是否滑到底部
        if (scrollTop + clientHeight >= scrollHeight - 1) {
            console.log('📌 scroll-area 已經滑到底部');
            // hasScrollTop.value = false;
        }
    };

    const focusScrollArea = () => {
        console.log('focusScrollArea');
        // if (scrollArea.value) {
        scrollArea.value.focus();
        // }
    };

    // const handleWindowScroll = () => {
    //     if (!boxRef.value) return;

    //     const rect = boxRef.value.getBoundingClientRect();
    //     if (rect.top <= 0) {
    //         console.log('🎯 box 已經到達瀏覽器最頂部');
    //         // hasScrollTop.value = true;
    //     }
    // };

    // onMounted(() => {
    //     window.addEventListener('scroll', handleWindowScroll, { passive: true });
    // });

    // onBeforeUnmount(() => {
    //     window.removeEventListener('scroll', handleWindowScroll);
    // });

    onMounted(() => {
        nextTick(() => {
            onScroll(); // 初始化時更新一次
        });
    });
</script>

<style lang="scss" scoped>
    h1 {
        font-size: 50px;
    }
    .h-40 {
        height: 40vh;
    }
    .h-60 {
        height: 60vh;
    }
    .h-100 {
        height: 100vh;
    }
    .has-sticky {
        position: sticky;
        top: 0;
    }
    .box {
        width: 100%;
        overflow: hidden;
    }
    .container {
        position: relative;

        display: flex;
        flex-direction: column;
        width: 100%;
        height: 50vh; // 固定高度
        border: 1px solid #ccc;
    }

    .scroll-area {
        flex: 1;
        overflow-y: auto; // 到達頂部再加入
    }

    .content {
        display: flex;
    }

    .text-column {
        width: 40%;
        height: 110vh;
        padding: 10px;
    }

    .text-block {
        margin-bottom: 20px;
        padding: 10px;
        background: #f0f0f0;
        transition: color 0.3s;
        color: gray;
        cursor: pointer;

        &.active {
            color: red;
            font-weight: bold;
        }
    }

    .color-column {
        width: 60%;
        display: flex;
        flex-direction: column;
    }

    .color-block {
        width: 100%;
        height: 100%;
        transition: background-color 0.5s ease-in-out; // 顏色平滑漸變
    }
</style>
