<template>
    <div>
        <el-table :data="tableData" style="width: 100%"
            @row-click="openTableDrawer">
            <el-table-column prop="year" label="年份" width="120" />
            <el-table-column prop="titleZh" label="中文标题" width="250" />
            <el-table-column prop="titleEn" label="英文标题" width="300" />
            <el-table-column prop="type" label="类型" width="120" />
            <el-table-column prop="researchArea" label="研究方向" width="150" />
            <el-table-column prop="journal" label="期刊/会议" width="200" />
            <el-table-column label="作者" :formatter="formatAuthors" width="180" />
        </el-table>
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
        titleZh: '自然语言处理中的迁移学习应用',
        titleEn: 'Transfer Learning in Natural Language Processing',
        type: '会议论文',
        researchArea: '自然语言处理',
        year: '2022',
        journal: 'ACL',
        authors: ['赵六', '钱七']
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
    }
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

// const openTableDrawer = (row) => {
//     // 可以在这里处理表格行的展示逻辑
//     currentPaper.value = {
//         titleZh: `表格行数据: ${row.name}`,
//         titleEn: '',
//         type: '表格数据',
//         researchArea: '',
//         year: row.date.split('-')[0],
//         journal: '',
//         authors: [row.address]
//     };
//     drawerVisible.value = true;
// };

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
.papers-container {
    padding: 20px;
}

.year-section {
    margin-bottom: 40px;
}

.paper-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 20px;
    margin-top: 15px;
}

.paper-card {
    border: 1px solid #e4e4e4;
    border-radius: 8px;
    padding: 15px;
    background-color: #fff;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    cursor: pointer;
    position: relative;
    overflow: visible;
}

.paper-card:hover {
    transform: translateY(-5px);
}

.paper-info h4 {
    font-size: 16px;
    margin: 10px 0 5px;
}

.title-en {
    color: #666;
    font-style: italic;
    font-size: 14px;
    margin-bottom: 10px;
}

.paper-info p {
    margin: 5px 0;
    font-size: 13px;
}

/* 论文详情样式 */
.paper-detail {
    padding: 20px;
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