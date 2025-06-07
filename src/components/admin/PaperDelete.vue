<template>
    <div class="article-table-container">
        <el-table ref="multipleTableRef" :data="tableData" row-key="id" style="width: 100%"
            @selection-change="handleSelectionChange">
            <!-- 多选列 -->
            <el-table-column type="selection" width="55" />

            <!-- 文章编号 -->
            <el-table-column label="编号" prop="id" width="80" />

            <!-- 日期 -->
            <el-table-column label="日期" prop="date" width="150" />

            <!-- 名称（标题） -->
            <el-table-column label="标题" prop="name" width="200" />

            <!-- 简介 -->
            <el-table-column label="简介" prop="description" show-overflow-tooltip />
        </el-table>

        <!-- 删除按钮 -->
        <div class="action-buttons">
            <el-button type="danger" @click="confirmDelete" :disabled="multipleSelection.length === 0">
                删除选中项
            </el-button>

            <el-button @click="resetSelection" type="info" :disabled="multipleSelection.length === 0">
                清空选择
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { TableInstance } from 'element-plus'
import { ElMessageBox, ElMessage } from 'element-plus'

interface Article {
    id: number
    date: string
    name: string
    description: string
}

const multipleTableRef = ref<TableInstance>()
const multipleSelection = ref<Article[]>([])

// 处理选择变化
const handleSelectionChange = (val: Article[]) => {
    multipleSelection.value = val
}

// 删除确认弹窗
const confirmDelete = () => {
    if (multipleSelection.value.length === 0) return

    ElMessageBox.confirm(
        `确定要删除选中的 ${multipleSelection.value.length} 项吗？`,
        '警告',
        {
            confirmButtonText: '确认删除',
            cancelButtonText: '取消',
            type: 'error'
        }
    ).then(() => {
        // 执行删除逻辑（例如调用 API 或从本地过滤）
        console.log('用户点击了确认删除')
        multipleTableRef.value!.clearSelection()
        ElMessage({
            type: 'success',
            message: '删除成功'
        })
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '已取消删除'
        })
    })
}

// 清空选择
const resetSelection = () => {
  multipleTableRef.value!.clearSelection()
}

// 表格数据
const tableData: Article[] = [
    {
        id: 1,
        date: '2016-05-03',
        name: '文章标题1',
        description: '这是第一篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 2,
        date: '2016-05-02',
        name: '文章标题2',
        description: '这是第二篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 3,
        date: '2016-05-04',
        name: '文章标题3',
        description: '这是第三篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 4,
        date: '2016-05-01',
        name: '文章标题4',
        description: '这是第四篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 5,
        date: '2016-05-08',
        name: '文章标题5',
        description: '这是第五篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 6,
        date: '2016-05-06',
        name: '文章标题6',
        description: '这是第六篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
    {
        id: 7,
        date: '2016-05-07',
        name: '文章标题7',
        description: '这是第七篇文章的简介内容，简要描述一下这篇文章的主要内容。',
    },
]
</script>

<style scoped>
.article-table-container {
    padding: 20px;
}

.action-buttons {
    margin-top: 20px;
}

.action-buttons {
  margin-top: 20px;
}
</style>