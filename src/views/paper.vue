<template>
    <div v-if="!isMobile" class="container">
        <NavBar ref="navbar" />

        <div class="table-container">
            <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }"
                @row-click="openTableDrawer">
                <el-table-column prop="year" label="年份" sortable width="100" />
                <el-table-column prop="titleZh" label="中文标题" width="250" />
                <el-table-column prop="titleEn" label="英文标题" width="250" />
                <el-table-column prop="researchArea" label="研究方向" width="170" />
                <el-table-column prop="journal" label="期刊/会议" width="200" />
                <el-table-column label="作者" :formatter="formatAuthors" width="190" />
            </el-table>
        </div>
    </div>

    <!-- 移动端专属容器 -->
    <div v-else class="paper-container-mobile">
        <!-- 导航栏 -->
        <NavBar ref="navbar" />

        <!-- 论文列表 -->
        <div class="mobile-paper-list">
            <div v-for="(paper, index) in papers" :key="index" class="mobile-paper-item"
                @click="openPaperDetail(paper)">
                <div class="mobile-paper-header">
                    <span class="mobile-paper-year">{{ paper.year }}</span>
                    <span class="mobile-paper-type">{{ paper.type }}</span>
                </div>
                <h3 class="mobile-paper-title">{{ paper.titleZh }}</h3>
                <p class="mobile-paper-subtitle">{{ paper.titleEn }}</p>
                <div class="mobile-paper-meta">
                    <span class="mobile-paper-journal">{{ paper.journal }}</span>
                    <span class="mobile-paper-authors">{{ paper.authors.join('、') }}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- 论文详情页 -->
    <div v-if="currentPaper" class="mobile-paper-detail" :class="{ 'active': showDetail }">
        <div class="mobile-detail-header">
            <button class="mobile-back-btn" @click="closePaperDetail">
                <i class="el-icon-arrow-left"></i> 返回
            </button>
            <h2 class="mobile-detail-title">论文详情</h2>
        </div>

        <div class="mobile-detail-content">
            <h3 class="mobile-detail-title-zh">{{ currentPaper.titleZh }}</h3>
            <p class="mobile-detail-title-en">{{ currentPaper.titleEn }}</p>

            <div class="mobile-detail-item">
                <span class="mobile-detail-label">类型：</span>
                <span>{{ currentPaper.type }}</span>
            </div>
            <div class="mobile-detail-item">
                <span class="mobile-detail-label">研究方向：</span>
                <span>{{ currentPaper.researchArea }}</span>
            </div>
            <div class="mobile-detail-item">
                <span class="mobile-detail-label">发表年份：</span>
                <span>{{ currentPaper.year }}</span>
            </div>
            <div class="mobile-detail-item">
                <span class="mobile-detail-label">期刊/会议：</span>
                <span>{{ currentPaper.journal }}</span>
            </div>
            <div class="mobile-detail-item">
                <span class="mobile-detail-label">作者：</span>
                <span>{{ currentPaper.authors.join('、') }}</span>
            </div>

            <div class="mobile-thumbnail-container" v-if="currentPaper.thumbnail">
                <h4 class="mobile-thumbnail-title">论文封面</h4>
                <img :src="currentPaper.thumbnail" :alt="currentPaper.titleZh" class="mobile-thumbnail" />
            </div>
        </div>
    </div>

    <!-- 论文详情 Drawer -->
    <el-drawer v-model="drawerVisible" title="论文详情" :direction="direction" size="50%">
        <div v-if="currentPaper" class="paper-detail">
            <h3>{{ currentPaper.titleZh }}</h3>
            <p class="title-en">{{ currentPaper.titleEn }}</p>
            <el-divider />
            <div class="detail-item">
                <span class="label">类型：</span>
                <span>{{ currentPaper.type }}</span>
            </div>
            <div class="detail-item">
                <span class="label">研究方向：</span>
                <span>{{ currentPaper.researchArea }}</span>
            </div>
            <div class="detail-item">
                <span class="label">发表年份：</span>
                <span>{{ currentPaper.year }}</span>
            </div>
            <div class="detail-item">
                <span class="label">期刊/会议：</span>
                <span>{{ currentPaper.journal }}</span>
            </div>
            <div class="detail-item">
                <span class="label">作者：</span>
                <span>{{ currentPaper.authors.join('、') }}</span>
            </div>
            <el-divider />
            <div class="thumbnail-container" v-if="currentPaper.thumbnail">
                <h4>论文封面</h4>
                <img :src="currentPaper.thumbnail" :alt="currentPaper.titleZh" class="thumbnail" />
            </div>
        </div>
    </el-drawer>
</template>

<script setup>
import { API_BASE_URL, IMAGE_BASE_URL } from '@/config'
import NavBar from '../components/NavBar.vue'

const navbar = ref(null)
import { computed, ref } from 'vue';
import { ElMessageBox } from 'element-plus'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')


// 示例数据：论文列表
const papers = [
    {
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/ij.webp`,
        titleZh: '基于深度学习的图像识别方法研究',
        titleEn: 'Research on Image Recognition Based on Deep Learning',
        type: '期刊论文',
        researchArea: '计算机视觉',
        year: '2023',
        journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
        authors: ['张三', '李四', '王五']
    },
    {
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/pdformer.webp`,
        titleZh: '人工智能在医疗诊断中的应用综述',
        titleEn: 'A Survey of AI Applications in Medical Diagnosis',
        type: '综述论文',
        researchArea: '人工智能与医疗',
        year: '2023',
        journal: 'Nature Reviews | Artificial Intelligence',
        authors: ['孙八', '周九']
    },
    {
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/vuevite.webp`,
        titleZh: '自然语言处理中的迁移学习应用',
        titleEn: 'Transfer Learning in Natural Language Processing',
        type: '会议论文',
        researchArea: '自然语言处理',
        year: '2022',
        journal: 'ACL',
        authors: ['赵六', '钱七']
    },

];

// 按年份分组
const groupedPapers = computed(() => {
    return papers.reduce((acc, paper) => {
        const year = paper.year;
        if (!acc[year]) acc[year] = [];
        acc[year].push(paper);
        return acc;
    }, {});
});

// Drawer 相关
const drawerVisible = ref(false)
const direction = ref('rtl') // 从右至左
const currentPaper = ref(null)
const showDetail = ref(false)

const openDrawer = (paper) => {
    currentPaper.value = paper
    drawerVisible.value = true
}

const openPaperDrawer = (paper) => {
    currentPaper.value = paper;
    drawerVisible.value = true;
};
// 表格相关
const formatter = (row, column) => {
    return row.address
}

// 修改表格数据
const tableData = papers.map(paper => ({
    ...paper, // 展开所有论文属性
    authorsString: paper.authors.join('、') // 预处理好作者字符串
}));

// 作者列格式化
const formatAuthors = (row) => {
    return row.authors.join('、');
}

// 修改表格点击处理
const openTableDrawer = (row) => {
    currentPaper.value = row; // 直接使用表格行数据，因为已经包含了所有论文信息
    drawerVisible.value = true;
};

// 打开论文详情页
const openPaperDetail = (paper) => {
    currentPaper.value = paper
    showDetail.value = true
    document.body.style.overflow = 'hidden' // 禁止背景滚动
}

// 关闭论文详情页
const closePaperDetail = () => {
    showDetail.value = false
    setTimeout(() => {
        currentPaper.value = null
        document.body.style.overflow = '' // 恢复背景滚动
    }, 300) // 等待动画完成
}
</script>

<style scoped>
.container {
    padding-top: 60px;
}

/* 容器样式：实现 el-table 居中 */
.table-container {
    max-width: 1200px;
    /* 根据实际需求调整 */
    margin: 0 auto;
    /* 左右居中 */
    padding: 0 1rem;
    /* 可选：添加内边距防止贴边 */
    box-sizing: border-box;
}

.papers-container {
    padding: 20px;
}

.year-section {
    margin-bottom: 40px;
}

.title-en {
    color: #666;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
}

.paper-detail h3 {
    margin-bottom: 10px;
}

.detail-item {
    margin: 15px 0;
    display: flex;
}

.detail-item .label {
    font-weight: bold;
    width: 100px;
}

.thumbnail-container {
    margin-top: 20px;
    text-align: center;
}

.thumbnail {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 基础样式 */
.paper-container-mobile {
    width: 100%;
    min-height: 100vh;
    font-family: system-ui, -apple-system, sans-serif;
    padding-top: 60px;
    background-color: #f8f9fa;
}

/* 论文列表样式 */
.mobile-paper-list {
    padding: 16px;
}

.mobile-paper-item {
    background: white;
    border-radius: 12px;
    padding: 16px;
    margin-bottom: 16px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.mobile-paper-item:active {
    transform: scale(0.98);
    background-color: #f0f0f0;
}

.mobile-paper-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.mobile-paper-year {
    font-weight: bold;
    color: #007bff;
}

.mobile-paper-type {
    font-size: 0.8rem;
    color: #666;
    background: #f0f0f0;
    padding: 2px 8px;
    border-radius: 10px;
}

.mobile-paper-title {
    font-size: 1.1rem;
    margin: 8px 0;
    color: #333;
}

.mobile-paper-subtitle {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    margin-bottom: 12px;
}

.mobile-paper-meta {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    color: #666;
}

.mobile-paper-journal {
    font-weight: 500;
    margin-bottom: 4px;
}

.mobile-paper-authors {
    color: #888;
}

/* 论文详情页样式 */
.mobile-paper-detail {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: white;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
}

.mobile-paper-detail.active {
    transform: translateX(0);
}

.mobile-detail-header {
    position: sticky;
    top: 0;
    background: white;
    padding: 16px;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    z-index: 10;
}

.mobile-back-btn {
    background: none;
    border: none;
    color: #007bff;
    font-size: 1rem;
    padding: 8px;
    margin-right: 16px;
}

.mobile-detail-title {
    font-size: 1.2rem;
    margin: 0;
}

.mobile-detail-content {
    padding: 16px;
}

.mobile-detail-title-zh {
    font-size: 1.2rem;
    margin-bottom: 8px;
    color: #333;
}

.mobile-detail-title-en {
    font-size: 0.9rem;
    color: #666;
    font-style: italic;
    margin-bottom: 16px;
}

.mobile-detail-item {
    margin: 12px 0;
    display: flex;
    font-size: 0.95rem;
}

.mobile-detail-label {
    font-weight: bold;
    width: 80px;
    flex-shrink: 0;
    color: #555;
}

.mobile-thumbnail-container {
    margin-top: 24px;
    text-align: center;
}

.mobile-thumbnail-title {
    font-size: 1rem;
    margin-bottom: 12px;
    color: #333;
}

.mobile-thumbnail {
    max-width: 100%;
    max-height: 200px;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 小屏优化 */
@media (max-width: 375px) {
    .mobile-paper-title {
        font-size: 1rem;
    }

    .mobile-detail-title-zh {
        font-size: 1.1rem;
    }
}
</style>