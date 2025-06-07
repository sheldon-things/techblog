<template>
    <div class="message-wall-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>留言墙</span>
                    <div class="actions">
                        <el-button type="danger" :disabled="selectedMessages.length === 0" @click="handleBatchDelete">
                            删除选中
                        </el-button>
                        <el-button type="success" :disabled="selectedMessages.length === 0" @click="handleBatchFeature">
                            设为精选
                        </el-button>
                        <el-button type="info" :disabled="selectedMessages.length === 0" @click="handleBatchReset">
                            重置状态
                        </el-button>
                    </div>
                </div>
            </template>

            <el-table :data="messages" style="width: 100%" @selection-change="handleSelectionChange" v-loading="loading"
                border>
                <el-table-column type="selection" width="55" />
                <el-table-column prop="id" label="编号" width="80" sortable />
                <el-table-column prop="createTime" label="时间" width="180" sortable>
                    <template #default="{ row }">
                        {{ formatTime(row.createTime) }}
                    </template>
                </el-table-column>
                <el-table-column prop="content" label="内容" min-width="300">
                    <template #default="{ row }">
                        <div class="message-content">
                            {{ row.content }}
                            <el-tag v-if="row.isFeatured" type="success" size="small" effect="dark"
                                style="margin-left: 8px">
                                精选
                            </el-tag>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="150">
                    <template #default="{ row }">
                        <el-button size="small" @click="handleFeature(row)">
                            {{ row.isFeatured ? '取消精选' : '设为精选' }}
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>

            <div class="pagination">
                <el-pagination v-model:current-page="currentPage" v-model:page-size="pageSize" :total="total"
                    :page-sizes="[10, 20, 50, 100]" layout="total, sizes, prev, pager, next, jumper"
                    @size-change="fetchMessages" @current-change="fetchMessages" />
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 留言数据
const messages = ref([])
// 选中的留言
const selectedMessages = ref([])
// 加载状态
const loading = ref(false)
// 分页
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 计算已精选的留言数量
const featuredCount = computed(() => {
    return messages.value.filter(msg => msg.isFeatured).length
})

// 检查是否还能设置更多精选
const canFeatureMore = computed(() => {
    return featuredCount.value < 8
})
// 获取留言列表
const fetchMessages = async () => {
    loading.value = true
    try {
        // 模拟API调用 - 实际替换为你的API
        // const res = await fetch(`/api/messages?page=${currentPage.value}&size=${pageSize.value}`)
        // const data = await res.json()
        // messages.value = data.list
        // total.value = data.total

        // 模拟数据
        messages.value = Array.from({ length: pageSize.value }, (_, i) => ({
            id: i + 1 + (currentPage.value - 1) * pageSize.value,
            content: `这是一条测试留言内容${i + 1}，可以包含各种用户反馈和建议。`,
            createTime: new Date().getTime() - i * 3600000,
            isFeatured: i % 3 === 0
        }))
        total.value = 100
    } catch (error) {
        ElMessage.error('获取留言失败: ' + error.message)
    } finally {
        loading.value = false
    }
}

// 格式化时间
const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleString()
}

// 处理选择变化
const handleSelectionChange = (selection) => {
    selectedMessages.value = selection
}

// 批量删除
const handleBatchDelete = () => {
    ElMessageBox.confirm(
        `确定要删除选中的 ${selectedMessages.value.length} 条留言吗？`,
        '警告',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(async () => {
        try {
            // 模拟API调用 - 实际替换为你的API
            // await fetch('/api/messages/delete', {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     ids: selectedMessages.value.map(item => item.id)
            //   })
            // })
            ElMessage.success('删除成功')
            fetchMessages()
        } catch (error) {
            ElMessage.error('删除失败: ' + error.message)
        }
    }).catch(() => {
        ElMessage.info('已取消删除')
    })
}

// 批量设为精选（修改后）
const handleBatchFeature = async () => {
    const selectedCount = selectedMessages.value.length
    const canFeatureCount = 8 - featuredCount.value

    if (selectedCount > canFeatureCount) {
        ElMessage.warning(`只能再精选${canFeatureCount}条留言，当前已精选${featuredCount.value}条`)
        return
    }

    try {
        // 筛选出未精选的留言
        const toFeature = selectedMessages.value.filter(msg => !msg.isFeatured)

        // 模拟API调用
        // await fetch('/api/messages/feature', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     ids: toFeature.map(item => item.id),
        //     isFeatured: true
        //   })
        // })

        // 更新本地状态
        toFeature.forEach(msg => {
            msg.isFeatured = true
        })

        ElMessage.success(`成功设置${toFeature.length}条精选留言`)
        fetchMessages()
    } catch (error) {
        ElMessage.error('设置精选失败: ' + error.message)
    }
}

// 批量重置状态
const handleBatchReset = async () => {
    try {
        // 模拟API调用 - 实际替换为你的API
        // await fetch('/api/messages/reset', {
        //   method: 'POST',
        //   body: JSON.stringify({
        //     ids: selectedMessages.value.map(item => item.id)
        //   })
        // })
        ElMessage.success('重置状态成功')
        fetchMessages()
    } catch (error) {
        ElMessage.error('重置状态失败: ' + error.message)
    }
}

// 单个设为精选（修改后）
const handleFeature = async (message) => {
    if (message.isFeatured) {
        // 取消精选
        try {
            // await fetch(`/api/messages/${message.id}/feature`, {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     isFeatured: false
            //   })
            // })
            message.isFeatured = false
            ElMessage.success('取消精选成功')
        } catch (error) {
            ElMessage.error('操作失败: ' + error.message)
        }
    } else {
        // 设为精选
        if (featuredCount.value >= 8) {
            ElMessage.warning('精选留言已达上限(8条)，请先取消其他精选')
            return
        }

        try {
            // await fetch(`/api/messages/${message.id}/feature`, {
            //   method: 'POST',
            //   body: JSON.stringify({
            //     isFeatured: true
            //   })
            // })
            message.isFeatured = true
            ElMessage.success('设为精选成功')
        } catch (error) {
            ElMessage.error('操作失败: ' + error.message)
        }
    }
}
// 初始化时加载数据
onMounted(() => {
    fetchMessages()
})
</script>

<style scoped>
.message-wall-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.actions {
    display: flex;
    gap: 10px;
}

.message-content {
    display: flex;
    align-items: center;
    word-break: break-word;
}

.pagination {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.el-table {
    margin-top: 20px;
}
</style>