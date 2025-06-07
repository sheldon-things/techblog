<template>
    <div class="gallery-delete-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>图片管理</span>
                    <el-button type="danger" :disabled="selectedFiles.length === 0" @click="confirmDelete">
                        删除选中图片
                    </el-button>
                </div>
            </template>

            <el-table :data="serverFiles" style="width: 100%" @selection-change="handleSelectionChange"
                v-loading="loading">
                <el-table-column type="selection" width="55" />
                <el-table-column label="预览" width="120">
                    <template #default="{ row }">
                        <el-image :src="row.url" :preview-src-list="[row.url]" fit="cover"
                            style="width: 100px; height: 100px" />
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="文件名" />
                <el-table-column prop="size" label="大小(MB)" width="120">
                    <template #default="{ row }">
                        {{ (row.size / (1024 * 1024)).toFixed(2) }}
                    </template>
                </el-table-column>
                <el-table-column prop="uploadTime" label="上传时间" width="180" />
            </el-table>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 服务器文件列表
const serverFiles = ref([])
// 选中的文件
const selectedFiles = ref([])
// 加载状态
const loading = ref(false)

// 获取服务器文件列表
const fetchServerFiles = async () => {
    loading.value = true
    try {
        // 替换为实际的API调用
        const response = await fetch('/api/images')
        serverFiles.value = await response.json()
    } catch (error) {
        ElMessage.error('获取文件列表失败: ' + error.message)
    } finally {
        loading.value = false
    }
}

// 处理选择变化
const handleSelectionChange = (selection) => {
    selectedFiles.value = selection
}

// 确认删除
const confirmDelete = () => {
    ElMessageBox.confirm(
        `确定要删除选中的 ${selectedFiles.value.length} 张图片吗？`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        deleteFiles()
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 删除文件
const deleteFiles = async () => {
    try {
        const fileIds = selectedFiles.value.map(file => file.id)
        // 替换为实际的API调用
        await fetch('/api/images/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ ids: fileIds })
        })

        ElMessage.success('删除成功')
        fetchServerFiles() // 刷新列表
        selectedFiles.value = [] // 清空选择
    } catch (error) {
        ElMessage.error('删除失败: ' + error.message)
    }
}

// 组件挂载时加载数据
onMounted(() => {
    fetchServerFiles()
})
</script>

<style scoped>
.gallery-delete-container {
    padding: 20px;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>