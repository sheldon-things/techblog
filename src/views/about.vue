<template>
    <!-- 移动端专属容器 -->
    <div v-if="isMobile" class="about-page-mobile">
        <!-- 导航栏 -->
        <NavBar ref="navbar" />

        <!-- 图片容器（移动端优化） -->
        <div class="mobile-image-container">
            <img :src="img_url" alt="">
        </div>

        <!-- 内容容器（重新设计布局） -->
        <div class="mobile-content-container">
            <!-- 个人简介 -->
            <section class="mobile-section">
                <h2 class="mobile-section-title">个人简介</h2>
                <p class="mobile-section-content">
                    一枚热爱技术的开发者，专注于工程化与用户体验优化。<br>
                    <strong>前端开发：</strong>Vue.js 生态（Vue3 + Vite + Pinia）、组件化架构设计、响应式布局与动画实现<br>
                    <strong>全栈技术：</strong>MySQL 数据库开发与优化、Node.js 后端服务搭建（RESTful API）<br>
                    <strong>软件工程专业研究生在读，研究方向聚焦于智能交通领域的预测算法应用，探索交通流量预测等场景的工程化落地。</strong><br>
                    学习之余喜欢记录技术探索过程，希望通过博客与更多开发者交流学习。
                </p>
            </section>

            <!-- 联系方式 -->
            <section class="mobile-section">
                <h2 class="mobile-section-title">联系方式</h2>
                <ul class="mobile-contact-list">
                    <li><strong>邮箱</strong>: 1666955239@qq.com</li>
                    <li><strong>地址</strong>: 厦门理工学院集美校区</li>
                </ul>
            </section>

            <!-- 做博客的原因 -->
            <section class="mobile-section">
                <h2 class="mobile-section-title">为什么做这个技术博客？</h2>
                <p class="mobile-section-content">
                    1. 知识沉淀：记录技术学习过程中的关键点，避免重复踩坑<br>
                    2. 论文积累：将自己的研究成果以及学习的前沿科技论文以博客形式呈现，方便自己他人总结学习<br>
                    3. 交流成长：通过评论互动获取不同视角的技术见解，促进自我提升<br>
                    4. 记录生活：用博客记录生活中的点滴，让生活更有意义
                </p>
            </section>

            <!-- 技术栈 -->
            <section class="mobile-section">
                <h2 class="mobile-section-title">博客使用的技术</h2>
                <div class="mobile-tech-stack">
                    <!-- 前端框架 -->
                    <span class="mobile-tech-tag">Vue 3</span>
                    <span class="mobile-tech-tag">Vue Router</span>
                    <span class="mobile-tech-tag">Pinia</span>
                    <span class="mobile-tech-tag">Element Plus</span>

                    <!-- 构建工具 -->
                    <span class="mobile-tech-tag">Vite</span>
                    <span class="mobile-tech-tag">PNPM</span>

                    <!-- 后端技术 -->
                    <span class="mobile-tech-tag">Python</span>
                    <span class="mobile-tech-tag">MySQL</span>

                    <!-- 开发工具 -->
                    <span class="mobile-tech-tag">Git</span>
                </div>
            </section>
        </div>
    </div>

    <div v-else class="about-page">
        <!-- 导航栏 -->
        <NavBar ref="navbar" />

        <div class="image-container">
            <img :src="img_url" alt="">
        </div>

        <!-- 内容容器 -->
        <div class="content-container">
            <!-- 个人简介 -->
            <section class="section">
                <h2 class="section-title">个人简介</h2>
                <p class="section-content">

                    一枚热爱技术的开发者，专注于工程化与用户体验优化。<br>
                    <strong>前端开发：</strong>Vue.js 生态（Vue3 + Vite + Pinia）、组件化架构设计、响应式布局与动画实现<br>
                    <strong>全栈技术：</strong>MySQL 数据库开发与优化、Python 后端服务搭建（RESTful API）<br>
                    <strong>软件工程专业研究生在读，研究方向聚焦于智能交通领域的预测算法应用，探索交通流量预测等场景的工程化落地。</strong><br>
                    学习之余喜欢记录技术探索过程，希望通过博客与更多开发者交流学习。
                </p>
            </section>

            <!-- 联系方式 -->
            <section class="section">
                <h2 class="section-title">联系方式</h2>
                <ul class="contact-list">
                    <li><strong>邮箱</strong>: 1666955239@qq.com</li>
                    <!-- <li><strong>GitHub</strong>: github.com/your-username</li> -->
                    <!-- <li><strong>微信</strong>: techblog-helper</li> -->
                    <li><strong>地址</strong>: 厦门理工学院集美校区</li>
                </ul>
            </section>

            <!-- 做博客的原因 -->
            <section class="section">
                <h2 class="section-title">为什么做这个技术博客？</h2>
                <p class="section-content">
                    1. 知识沉淀：记录技术学习过程中的关键点，避免重复踩坑<br>
                    2. 论文积累：将自己的研究成果以及学习的前沿科技论文以博客形式呈现，方便自己他人总结学习<br>
                    3. 交流成长：通过评论互动获取不同视角的技术见解，促进自我提升<br>
                    4. 记录生活：用博客记录生活中的点滴，让生活更有意义
                </p>
            </section>

            <!-- 技术栈 -->
            <section class="section">
                <h2 class="section-title">博客使用的技术</h2>
                <div class="tech-stack">
                    <span class="tech-tag">Vue 3</span>
                    <span class="tech-tag">Vue Router</span>
                    <span class="tech-tag">Pinia</span>
                    <span class="tech-tag">Element Plus</span>
                    <span class="tech-tag">Vite</span>
                    <span class="tech-tag">MySQL</span>
                    <span class="tech-tag">Python</span>
                    <span class="tech-tag">Git</span>
                    <span class="tech-tag">PNPM</span>
                </div>
            </section>
        </div>
    </div>


</template>

<script setup>
import { API_BASE_URL, IMAGE_BASE_URL } from '@/config'
import { useMediaQuery } from '@vueuse/core'

import NavBar from '../components/NavBar.vue'
const img_url = `${IMAGE_BASE_URL}/about/about.webp`

const isMobile = useMediaQuery('(max-width: 768px)')

</script>

<style scoped>
.about-page {
    width: 100%;
    min-height: 100vh;
    font-family: 'Inter', sans-serif;
    position: relative;
    padding-top: 80px;
}

/* 替换背景图为黑白灰渐变色 */
.about-page::before {
    content: '';
    position: fixed;
    /* 保持固定定位 */
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* 填满整个视口 */
    /* background: linear-gradient(135deg, #2d2d2d 0%, #4a4a4a 50%, #6b6b6b 100%); */
    /* 黑白灰渐变 */
    z-index: -1;
    /* 背景在内容下方 */
}

.content-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 80px 1rem 2rem;
    /* 顶部padding增加，避免被导航栏遮挡 */
    position: relative;
    /* 确保z-index生效 */
    z-index: 1;
    /* 内容层高于背景 */
}

.section {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 20px;
    /* 增加圆角 */
    padding: 2.5rem 3rem;
    /* 左右padding增加 */
    margin-bottom: 2.5rem;
    /* 增加模块间距 */
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    /* 更柔和的阴影 */
    backdrop-filter: blur(12px);
    /* 增强毛玻璃效果 */
    transition: transform 0.3s ease;
    /* 新增卡片过渡效果 */
}

.section:hover {
    transform: translateY(-5px);
    /* 悬停时卡片上移 */
}

.section-title {
    font-size: 2rem;
    /* 标题增大 */
    font-weight: 600;
    /* 标题加粗 */
    background: linear-gradient(90deg, #00d4ff, #7a00ff);
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    margin-bottom: 2rem;
    /* 标题与内容间距增加 */
}

.section-content {
    font-size: 1.05rem;
    /* 内容文字增大 */
    line-height: 2;
    /* 行高增加更易读 */
    color: #333;
}

.contact-list li {
    margin-bottom: 1rem;
    /* 联系方式行间距增加 */
    font-size: 1.05rem;
}

.tech-tag {
    padding: 0.5rem 1.2rem;
    margin: 0 0.5rem;
    /* 标签增大 */
    background: rgba(0, 212, 255, 0.1);
    color: #000000;
    border-radius: 24px;
    /* 更圆润的标签 */
    font-size: 0.95rem;
    font-weight: 500;
    transition: all 0.3s ease;
    /* 新增标签过渡 */
}

.tech-tag:hover {
    background: rgba(0, 212, 255, 0.2);
    /* 悬停时背景加深 */
    transform: scale(1.05);
    /* 悬停时轻微放大 */
}

.image-container {
    max-width: 1200px;
    /* 与内容容器的最大宽度保持一致 */
    width: 100%;
    /* 确保它填满其父容器的宽度 */
    margin: 0 auto;
    /* 可选：让图片容器居中 */
    padding: 0 1rem;
    /* 可选：添加一些内边距以适应边缘 */
    box-sizing: border-box;

    opacity: 0;
    /* 初始状态不可见 */
    animation: imageEntrance 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    animation-delay: 0.3s;
    /* 延迟出现 */
    /* 确保内边距不影响宽度计算 */
}

@keyframes imageEntrance {
    from {
        opacity: 0;
        transform: translateY(30px) scale(0.98);
        filter: blur(2px);
    }

    to {
        opacity: 1;
        transform: translateY(0) scale(1);
        filter: blur(0);
    }
}

.image-container img {
    width: 100%;
    /* 让图片填满 .image-container 的宽度 */
    height: auto;
    /* 保持图片比例 */
}

/* 新增全局动画 */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.section {
    /* 新增入场动画 */
    animation: fadeInUp 0.6s ease forwards;
    opacity: 0;

    /* 延迟加载动画 */
    &:nth-child(1) {
        animation-delay: 0.2s;
    }

    &:nth-child(2) {
        animation-delay: 0.4s;
    }

    &:nth-child(3) {
        animation-delay: 0.6s;
    }

    &:nth-child(4) {
        animation-delay: 0.8s;
    }
}

/* 响应式优化 */
@media (max-width: 768px) {
    .content-container {
        padding: 40px 1rem;
    }

    .section {
        padding: 1.5rem;
        margin-bottom: 1.5rem;
    }

    .image-container {
        margin: 1rem auto;
        border-radius: 8px;
    }

    .tech-tag {
        margin: 0.25rem;
        padding: 0.4rem 1rem;
    }
}

.about-page-mobile {
    width: 100%;
    min-height: 100vh;
    font-family: system-ui, -apple-system, sans-serif;
    padding-top: 60px;
    background: #f8f9fa;
}

/* 图片容器优化 */
.mobile-image-container {
    width: 90%;
    padding: 0;
    /* margin-bottom: 1rem; */
    margin: 1rem auto;
}

.mobile-image-container img {
    width: 100%;
    height: auto;
    border-radius: 0;
}

/* 内容容器 */
.mobile-content-container {
    padding: 0 16px 20px;
}

/* 模块卡片设计 */
.mobile-section {
    background: white;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

.mobile-section-title {
    font-size: 1.3rem;
    font-weight: 600;
    color: #333;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3);
}

.mobile-section-content {
    font-size: 0.95rem;
    line-height: 1.7;
    color: #555;
}

/* 联系方式列表 */
.mobile-contact-list {
    padding-left: 0;
    list-style: none;
}

.mobile-contact-list li {
    margin-bottom: 12px;
    font-size: 0.95rem;
}

/* 技术栈标签 */
.mobile-tech-stack {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.mobile-tech-tag {
    padding: 6px 12px;
    background: rgba(0, 212, 255, 0.15);
    color: #007bff;
    border-radius: 16px;
    font-size: 0.85rem;
    font-weight: 500;
}

/* 小屏优化（如iPhone SE） */
@media (max-width: 375px) {
    .mobile-section {
        padding: 16px;
    }

    .mobile-section-title {
        font-size: 1.2rem;
    }

    .mobile-tech-tag {
        padding: 4px 10px;
        font-size: 0.8rem;
    }
}

/* 动画简化（移动端性能优化） */
.mobile-section {
    opacity: 0;
    animation: mobileFadeIn 0.4s ease-out forwards;
}

@keyframes mobileFadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 为不同模块设置延迟 */
.mobile-section:nth-child(1) {
    animation-delay: 0.1s;
}

.mobile-section:nth-child(2) {
    animation-delay: 0.2s;
}

.mobile-section:nth-child(3) {
    animation-delay: 0.3s;
}

.mobile-section:nth-child(4) {
    animation-delay: 0.4s;
}
</style>