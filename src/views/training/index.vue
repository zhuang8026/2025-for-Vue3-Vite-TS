<template>
    <!-- training -->
    <div class="pose-container">
        <video ref="video" class="video" autoplay playsinline muted></video>
        <canvas ref="canvas" class="canvas" />
    </div>
</template>

<script setup lang="ts">
    import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue';
    import * as tf from '@tensorflow/tfjs';
    import * as poseDetection from '@tensorflow-models/pose-detection';
    import '@tensorflow/tfjs-backend-webgl';

    // DOM 元素
    const video = ref<HTMLVideoElement | null>(null);
    const canvas = ref<HTMLCanvasElement | null>(null);

    let detector: poseDetection.PoseDetector | null = null;
    let animationFrameId: number;

    // 初始化攝影機 & 模型
    onMounted(async () => {
        console.log('元件初始化完成後 渲染');
        await tf.setBackend('webgl');
        await tf.ready();

        // 初始化攝影機
        const stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 640, height: 480 },
        });
        if (video.value) {
            video.value.srcObject = stream;

            // 等待 video metadata 加載完成，取得實際寬高
            await new Promise(resolve => {
                video.value!.onloadedmetadata = () => {
                    video.value!.play();
                    // 動態設定 canvas 寬高
                    canvas.value!.width = video.value!.videoWidth;
                    canvas.value!.height = video.value!.videoHeight;
                    resolve(true);
                };
            });
        }

        // 初始化 MoveNet 模型
        detector = await poseDetection.createDetector(poseDetection.SupportedModels.MoveNet);

        detectLoop(); // 開始監控
    });

    onBeforeUnmount(() => {
        console.log('元件被移除之前 銷毀');
        cancelAnimationFrame(animationFrameId);
    });

    onUnmounted(() => {
        console.log('元件被移除之後 銷毀');
    });

    // 持續偵測
    async function detectLoop() {
        if (!video.value || !canvas.value || !detector) return;

        const ctx = canvas.value.getContext('2d');
        if (!ctx) return;

        const poses = await detector.estimatePoses(video.value);

        ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);

        if (poses.length > 0) {
            const keypoints = poses[0].keypoints;
            drawKeypoints(ctx, keypoints); // 關節
            drawSkeleton(ctx, keypoints); // 骨架
            checkArmRaised(keypoints); // 測試 手 舉起來
        }

        animationFrameId = requestAnimationFrame(detectLoop);
    }

    // 畫關節
    function drawKeypoints(ctx: CanvasRenderingContext2D, keypoints: poseDetection.Keypoint[]) {
        keypoints.forEach(keypoint => {
            const { x, y, score, name } = keypoint;
            if (score && score > 0.5) {
                // 畫點
                ctx.beginPath();
                ctx.arc(x, y, 5, 0, 2 * Math.PI);
                ctx.fillStyle = '#00ff00';
                ctx.fill();
            }
        });
    }

    // 畫骨架
    function drawSkeleton(ctx: CanvasRenderingContext2D, keypoints: poseDetection.Keypoint[]) {
        const adjacentPairs = poseDetection.util.getAdjacentPairs(
            poseDetection.SupportedModels.MoveNet
        );

        adjacentPairs.forEach(([i, j]) => {
            const kp1 = keypoints[i];
            const kp2 = keypoints[j];

            if ((kp1?.score ?? 0) > 0.5 && (kp2?.score ?? 0) > 0.5) {
                ctx.beginPath();
                ctx.moveTo(kp1.x, kp1.y);
                ctx.lineTo(kp2.x, kp2.y);
                ctx.lineWidth = 2;
                ctx.strokeStyle = '#ff0000';
                ctx.stroke();
            }
        });
    }

    // 檢查手臂是否舉
    function checkArmRaised(keypoints: poseDetection.Keypoint[]) {
        const leftWrist = keypoints.find(p => p.name === 'left_wrist');
        const leftShoulder = keypoints.find(p => p.name === 'left_shoulder');

        const rightWrist = keypoints.find(p => p.name === 'right_wrist');
        const rightShoulder = keypoints.find(p => p.name === 'right_shoulder');

        // 確保有值並且可信度夠高
        if (
            leftWrist &&
            leftShoulder &&
            (leftWrist.score ?? 0) > 0.5 &&
            (leftShoulder.score ?? 0) > 0.5
        ) {
            if (leftWrist.y < leftShoulder.y) {
                console.log('✅ 左手有舉起來');
            }
        }

        if (
            rightWrist &&
            rightShoulder &&
            (rightWrist.score ?? 0) > 0.5 &&
            (rightShoulder.score ?? 0) > 0.5
        ) {
            if (rightWrist.y < rightShoulder.y) {
                console.log('✅ 右手有舉起來');
            }
        }
    }
</script>

<style scoped>
    .pose-container {
        position: relative;
        width: 640px;
        height: 480px;
    }

    .video {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        width: 100%; /* 用 CSS 撐滿容器 */
        height: 100%;
        object-fit: cover;
        transform: scaleX(-1); /* 鏡像影片 */
    }

    .canvas {
        position: absolute;
        z-index: 2;
        top: 0;
        left: 0;
        width: 100%; /* 用 CSS 撐滿容器 */
        height: 100%;
        transform: scaleX(-1); /* 鏡像畫布，保持一致 */
    }
</style>
