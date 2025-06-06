<template>
    <div class="container">
        <NavBar ref="navbar" />

        <div class="table-container">
            <el-table :data="tableData" :default-sort="{ prop: 'date', order: 'descending' }" @row-click="openTableDrawer">
                <el-table-column prop="year" label="年份" sortable  width="100" />
                <el-table-column prop="titleZh" label="中文标题" width="250" />
                <el-table-column prop="titleEn" label="英文标题" width="250" />
                <el-table-column prop="researchArea" label="研究方向" width="170" />
                <el-table-column prop="journal" label="期刊/会议" width="200" />
                <el-table-column label="作者" :formatter="formatAuthors" width="190" />
            </el-table>
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
import NavBar from '../components/NavBar.vue'

const navbar = ref(null)
import { computed, ref } from 'vue';
import { ElMessageBox } from 'element-plus'

// 示例数据：论文列表
const papers = [
    {
        thumbnail: '/static/paper/paper1.png',
        titleZh: '基于深度学习的图像识别方法研究',
        titleEn: 'Research on Image Recognition Based on Deep Learning',
        type: '期刊论文',
        researchArea: '计算机视觉',
        year: '2023',
        journal: 'IEEE Transactions on Pattern Analysis and Machine Intelligence',
        authors: ['张三', '李四', '王五']
    },
    {
        thumbnail: '/static/paper/paper1.png',
        titleZh: '人工智能在医疗诊断中的应用综述',
        titleEn: 'A Survey of AI Applications in Medical Diagnosis',
        type: '综述论文',
        researchArea: '人工智能与医疗',
        year: '2023',
        journal: 'Nature Reviews | Artificial Intelligence',
        authors: ['孙八', '周九']
    },
    {
        thumbnail: '/static/paper/paper1.png',
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
</style>