<template>
    <div class="gallery-add-container">
        <!-- 左侧上传区域 -->
        <el-card class="upload-section">
            <template #header>
                <div class="card-header">
                    <span>上传图片</span>
                    <el-button type="primary" @click="submitUpload" :disabled="fileList.length === 0">
                        上传到服务器
                    </el-button>
                </div>
            </template>
            <el-upload v-model:file-list="fileList" action="#" list-type="picture-card" :auto-upload="false"
                :on-change="handleChange" :on-remove="handleRemove" multiple accept="image/*">
                <el-icon>
                    <Plus />
                </el-icon>
                <template #file="{ file }">
                    <div>
                        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                        <span class="el-upload-list__item-actions">
                            <span class="el-upload-list__item-preview" @click.stop="handlePictureCardPreview(file)">
                                <el-icon>
                                    <ZoomIn />
                                </el-icon>
                            </span>
                            <span class="el-upload-list__item-edit" @click.stop="selectFile(file)">
                                <el-icon>
                                    <Edit />
                                </el-icon>
                            </span>
                            <span class="el-upload-list__item-delete" @click.stop="handleRemove(file)">
                                <el-icon>
                                    <Delete />
                                </el-icon>
                            </span>
                        </span>
                    </div>
                </template>
            </el-upload>

        </el-card>

        <!-- 右侧信息区域 -->
        <el-card class="info-section">
            <template #header>
                <span>图片信息</span>
            </template>
            <div v-if="activeFile" class="file-info">
                <el-form label-position="top" :model="formData">
                    <el-form-item label="图片名称" prop="name">
                        <el-input v-model="formData.name" />
                    </el-form-item>
                    <el-form-item label="上传时间" prop="uploadTime">
                        <el-input v-model="formData.uploadTime" disabled />
                    </el-form-item>
                    <el-form-item label="文件大小（MB）" prop="displaySize">
                        <el-input v-model="formData.displaySize" disabled />
                    </el-form-item>
                    <el-form-item label="描述" prop="description">
                        <el-input v-model="formData.description" type="textarea" :rows="3" />
                    </el-form-item>
                </el-form>
            </div>
            <el-empty v-else description="请点击编辑图标进行编辑" />
        </el-card>

        <!-- 图片预览对话框 - 修改这部分 -->
        <el-dialog v-model="dialogVisible" width="70%" :lock-scroll="false">
            <div class="image-preview-container">
                <img :src="dialogImageUrl" alt="Preview Image" class="preview-image" />
            </div>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Plus, ZoomIn, Edit, Delete } from '@element-plus/icons-vue';

const formData = reactive({
    name: '',
    uploadTime: '',
    displaySize: '',
    description: ''
})

const fileList = ref([]);
const activeFile = ref(null);
const dialogVisible = ref(false);
const dialogImageUrl = ref('');

const handleChange = (uploadFile, uploadFiles) => {
    fileList.value = uploadFiles.map(file => {
        // 创建一个全新的对象，避免直接扩展file对象
        const newFile = {
            uid: file.uid || Date.now(),
            url: file.url || URL.createObjectURL(file.raw),
            name: file.name.split('.')[0],
            uploadTime: new Date().toLocaleString(), // 确保日期生成
            displaySize: (file.size / (1024 * 1024)).toFixed(2),
            originalSize: file.size,
            description: '',
            // 保留必要的原始属性
            raw: file.raw,
            status: file.status,
            percentage: file.percentage
        };

        console.log('Processed file:', newFile); // 检查输出
        return newFile;
    });
};

const handleRemove = (file) => {
    const index = fileList.value.findIndex(f => f.uid === file.uid);
    if (index !== -1) {
        fileList.value.splice(index, 1);
    }
    if (activeFile.value?.uid === file.uid) {
        activeFile.value = null;
    }
};


const selectFile = (file) => {
    Object.assign(formData, {
        name: file.name.split('.')[0],
        uploadTime: new Date().toLocaleString(),
        displaySize: (file.size / (1024 * 1024)).toFixed(2),
        description: file.description || ''
    })
    activeFile.value = file
}

const handlePictureCardPreview = (file) => {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
};

const submitUpload = () => {
    console.log('上传文件:', fileList.value);
    ElMessage.success('上传成功');
};

const saveInfo = () => {
    if (activeFile.value) {
        activeFile.value = {
            ...activeFile.value,
            ...formData
        }
        ElMessage.success('信息保存成功')
    }
}
</script>

<style scoped>
.gallery-add-container {
    display: flex;
    gap: 20px;
    padding: 20px;
}

/* 添加卡片头部样式 */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.upload-section {
    flex: 2;
}

.info-section {
    flex: 1;
}

/* 调整上传组件样式 */
:deep(.el-upload-list--picture-card) {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
    width: 19%;
    height: 148px;
    margin: 0;
    margin: 0;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.el-upload-list__item-actions) {
    display: flex;
    justify-content: center;
    align-items: center;
}

:deep(.el-upload-list__item-actions span) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border-radius: 50%;
    cursor: pointer;
}

:deep(.el-upload-list__item-actions span:hover) {
    background: rgba(0, 0, 0, 0.7);
}

.file-info {
    padding: 10px;
}

/* 新增预览对话框样式 */
.image-preview-container {
    display: flex;
    justify-content: center;
    align-items: center;
    max-height: 70vh;
    overflow: auto;
}

.preview-image {
    max-width: 100%;
    max-height: 70vh;
    object-fit: contain;
    display: block;
    margin: 0 auto;
}

/* 调整对话框头部样式 */
:deep(.el-dialog__header) {
    padding: 16px;
}

/* 调整对话框主体样式 */
:deep(.el-dialog__body) {
    padding: 10px 20px;
}

/* 修改缩略图样式 - 让长图片完整显示并等比例缩放 */
:deep(.el-upload-list__item-thumbnail) {
    max-width: 100%;
    max-height: 100%;
    width: auto;
    height: auto;
    object-fit: contain;
    /* 确保图片完整显示 */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    /* 填充空白区域 */
    border-radius: 4px;
}

/* 操作图标容器 - 覆盖在图片上 */
:deep(.el-upload-list__item-actions) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.3s;
}

/* 鼠标悬停时显示操作图标 */
:deep(.el-upload-list__item:hover .el-upload-list__item-actions) {
    opacity: 1;
}

/* 操作图标样式 */
:deep(.el-upload-list__item-actions span) {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    margin: 0 5px;
    background: rgba(255, 255, 255, 0.9);
    color: #666;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s;
}

:deep(.el-upload-list__item-actions span:hover) {
    background: #409eff;
    color: white;
    transform: scale(1.1);
}

/* 特别针对删除按钮 */
:deep(.el-upload-list__item-delete) {
    color: #666 !important;
    /* 覆盖默认白色 */
}

:deep(.el-upload-list__item-delete:hover) {
    color: white !important;
    background: #f56c6c !important;
    /* 删除按钮用红色 */
}
</style>