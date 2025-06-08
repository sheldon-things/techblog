<template>
    <div class="background-manage">
        <el-card shadow="hover" class="manage-card">
            <template #header>
                <div class="card-header">
                    <span>首页背景图管理</span>
                    <el-button type="primary" @click="showUploadDialog = true" plain>
                        <el-icon>
                            <Upload />
                        </el-icon>上传新背景
                    </el-button>
                </div>
            </template>

            <!-- 当前使用的背景 -->
            <div class="current-background">
                <h3>当前使用背景</h3>
                <el-image :src="currentBackground" fit="cover" class="background-image"
                    :preview-src-list="[currentBackground]" :initial-index="0">
                    <template #error>
                        <div class="image-error">
                            <el-icon>
                                <Picture />
                            </el-icon>
                            <span>暂无背景图</span>
                        </div>
                    </template>
                </el-image>
                <div class="image-info">
                    <span>上传时间: {{ currentBackgroundInfo.uploadTime || '--' }}</span>
                    <el-button type="danger" size="small" @click="removeBackground" :disabled="!currentBackground">
                        <el-icon>
                            <Delete />
                        </el-icon>移除
                    </el-button>
                </div>
            </div>

            <!-- 历史背景图 -->
            <div class="history-background">
                <h3>历史背景图</h3>
                <el-scrollbar>
                    <div class="history-list">
                        <div v-for="(bg, index) in historyBackgrounds" :key="index" class="history-item"
                            @click="setCurrentBackground(bg)">
                            <el-image :src="bg.url" fit="cover" class="background-thumbnail" />
                            <div class="item-actions">
                                <el-button type="primary" size="small" @click.stop="setCurrentBackground(bg)">
                                    <el-icon>
                                        <Check />
                                    </el-icon>使用
                                </el-button>
                                <el-button type="danger" size="small" @click.stop="deleteBackground(index)">
                                    <el-icon>
                                        <Delete />
                                    </el-icon>删除
                                </el-button>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
        </el-card>

        <!-- 上传对话框 -->
        <el-dialog v-model="showUploadDialog" title="上传背景图" width="500px">
            <el-upload class="upload-demo" drag action="/api/upload" <!-- 替换为实际API地址 -->
                multiple
                :limit="1"
                :on-success="handleUploadSuccess"
                :before-upload="beforeUpload"
                :file-list="fileList"
                >
                <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                <div class="el-upload__text">
                    拖拽文件到此处或 <em>点击上传</em>
                </div>
                <template #tip>
                    <div class="el-upload__tip">
                        建议上传尺寸为1920×1080的webp/webp文件，大小不超过5MB
                    </div>
                </template>
            </el-upload>
            <template #footer>
                <el-button @click="showUploadDialog = false">取消</el-button>
                <el-button type="primary" @click="showUploadDialog = false">确定</el-button>
            </template>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import {
    Upload,
    Delete,
    Picture,
    Check,
    UploadFilled
} from '@element-plus/icons-vue'

// 当前背景图 (示例数据)
const currentBackground = ref('/static/hero.webp')
const currentBackgroundInfo = ref({
    uploadTime: '2023-10-15 14:30'
})

// 历史背景图 (示例数据)
const historyBackgrounds = ref([
    { url: '/static/bg1.webp', uploadTime: '2023-09-10 10:20' },
    { url: '/static/bg2.webp', uploadTime: '2023-08-05 15:45' },
    { url: '/static/bg3.webp', uploadTime: '2023-07-22 09:30' }
])

// 上传相关
const showUploadDialog = ref(false)
const fileList = ref([])

// 方法
const setCurrentBackground = (bg) => {
    currentBackground.value = bg.url
    currentBackgroundInfo.value = {
        uploadTime: bg.uploadTime || new Date().toLocaleString()
    }
}

const removeBackground = () => {
    currentBackground.value = ''
    currentBackgroundInfo.value = {}
}

const deleteBackground = (index) => {
    historyBackgrounds.value.splice(index, 1)
}

const beforeUpload = (file) => {
    const isImage = file.type.includes('image/')
    const isLt5M = file.size / 1024 / 1024 < 5

    if (!isImage) {
        ElMessage.error('只能上传图片文件!')
        return false
    }

    if (!isLt5M) {
        ElMessage.error('图片大小不能超过5MB!')
        return false
    }

    return true
}

const handleUploadSuccess = (response, file) => {
    // 这里处理上传成功后的逻辑
    const newBg = {
        url: URL.createObjectURL(file.raw),
        uploadTime: new Date().toLocaleString()
    }

    setCurrentBackground(newBg)
    historyBackgrounds.value.unshift(newBg)
    fileList.value = []
}
</script>

<style scoped>
.background-manage {
    padding: 20px;
}

.manage-card {
    border-radius: 8px;
    border: none;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.current-background,
.history-background {
    margin-bottom: 30px;
}

.current-background h3,
.history-background h3 {
    color: #666;
    margin-bottom: 15px;
    font-weight: normal;
}

.background-image {
    width: 50%;
    height: 400px;
    border-radius: 6px;
    background-color: #f5f7fa;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
}
.image-error {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #909399;
}

.image-error .el-icon {
    font-size: 50px;
    margin-bottom: 10px;
}

.image-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    color: #888;
    font-size: 14px;
}

.history-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
}

.history-item {
    position: relative;
    cursor: pointer;
    border-radius: 6px;
    overflow: hidden;
    transition: all 0.3s;
    border: 1px solid #ebeef5;
}

.history-item:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.background-thumbnail {
    width: 100%;
    height: 120px;
}

.item-actions {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.5);
    padding: 8px;
    display: flex;
    justify-content: space-around;
    opacity: 0;
    transition: opacity 0.3s;
}

.history-item:hover .item-actions {
    opacity: 1;
}

.upload-demo {
    text-align: center;
}
</style>