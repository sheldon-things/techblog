<template>
    <div class="article-add-container">
        <h2>添加新文章</h2>

        <el-form :model="form" label-width="120px" style="max-width: 800px">
            <!-- 标题 -->
            <el-form-item label="文章标题">
                <el-input v-model="form.title" placeholder="请输入文章标题" />
            </el-form-item>

            <!-- 发布时间 -->
            <el-form-item label="发布时间">
                <el-date-picker v-model="form.publishTime" type="datetime" placeholder="请选择发布时间" style="width: 100%" />
            </el-form-item>

            <!-- 封面上传 -->
            <el-form-item label="封面图片">
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleImageChange"
                    :limit="1" :file-list="imageFileList">
                    <i class="el-icon-plus"></i>
                </el-upload>
            </el-form-item>

            <!-- 文章内容 -->
            <el-form-item label="文章内容">
                <el-input v-model="form.content" type="textarea" :rows="6" placeholder="请输入文章内容" />
            </el-form-item>

            <!-- 文章内容 -->
            <el-form-item label="文章内容">
                <quill-editor v-model="form.content" />
                
            </el-form-item>

            <!-- 编辑人员 -->
            <el-form-item label="编辑人员">
                <el-input v-model="form.editor" placeholder="请输入编辑人员姓名" disabled />
            </el-form-item>

            <!-- 操作按钮 -->
            <el-form-item>
                <el-button type="primary" @click="submitForm">发布文章</el-button>
                <el-button @click="resetForm">清空表单</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css' // 引入样式


// 表单数据
const form = ref({
    title: '',
    publishTime: '',
    coverImage: null,
    content: '',
    editor: 'admin', // 可根据登录用户动态设置
})

// 图片文件列表（用于 el-upload）
const imageFileList = ref([])

// 提交表单
const submitForm = () => {
    if (!form.value.title.trim()) {
        ElMessage.warning('请填写文章标题')
        return
    }

    if (!form.value.publishTime) {
        ElMessage.warning('请选择发布时间')
        return
    }

    if (!form.value.content.trim()) {
        ElMessage.warning('文章内容不能为空')
        return
    }

    // 这里可以发送请求到后端保存数据
    console.log('提交的数据:', form.value)
    ElMessage.success('文章已提交')
}

// 清空表单
const resetForm = () => {
    form.value = {
        title: '',
        publishTime: '',
        coverImage: null,
        content: '',
        editor: 'admin',
    }
    imageFileList.value = []
    ElMessage.info('表单已重置')
}

// 处理图片上传变更
const handleImageChange = (file, fileList) => {
    form.value.coverImage = file
}
</script>

<style scoped>
.article-add-container {
    padding: 30px;
    background-color: #f9fafb;
    /* max-width: 1200px; */
    margin: 0 auto;
}

h2 {
    margin-bottom: 20px;
    color: #333;
}

.el-form-item {
    margin-bottom: 20px;
}
</style>