<template>
    <div class="article-add-container">
        <h2>添加新文章</h2>
        <el-form :model="form" label-width="120px">
            <!-- 标题 -->
            <el-form-item label="文章标题">
                <el-input v-model="form.title" placeholder="请输入文章标题" />
            </el-form-item>

            <!-- 发布时间 -->
            <el-form-item label="发布时间">
                <el-date-picker v-model="form.publishTime" type="datetime" placeholder="请选择发布时间" style="width: 100%" />
            </el-form-item>

            <el-form-item label="封面图片">
                <el-upload action="#" list-type="picture-card" :auto-upload="false" :on-change="handleImageChange"
                    :limit="1" :file-list="imageFileList">
                    <el-icon>
                        <Plus />
                    </el-icon> <!-- 使用Element Plus的Plus图标 -->
                </el-upload>
            </el-form-item>

            <!-- 文章内容 -->
            <!-- :toolbar="['bold', 'italic', 'underline', 'strike', 'code-block', 'image']" -->
            <el-form-item label="文章内容">
                <div style="width: 100%;">
                    <!-- <QuillEditor theme="snow" ref="quillEditorRef" :options="options" v-model:content="content"
                        contentType="html" style="min-height: 200px;" :modules="modules"/> -->
                    <!-- <QuillEditor theme="snow" ref="quillEditorRef" v-model:content="content" contentType="html"
                        style="min-height: 200px;" :modules="modules"
                        :toolbar="['bold', 'italic', 'underline', 'strike', 'code-block', 'image']" /> -->
                    <div id="vditor" style="min-height: 50vh;"></div>
                    <el-button type="primary" @click="saveContent" class="save-btn">保存文章</el-button>
                </div>
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
import { ref, onBeforeUnmount, shallowRef, onMounted, toRaw } from 'vue'
import { ElMessage, ElLoading } from 'element-plus'
import { QuillEditor, Quill } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css' // 引入样式
import { Plus } from '@element-plus/icons-vue' // 导入Plus图标
import ImageUploader from 'quill-image-uploader';
import axios from 'axios' //

import Vditor from 'vditor'
import 'vditor/dist/index.css'

const editorContent = ref('')
const vditor = ref(null)

// 表单数据
const form = ref({
    title: '',
    publishTime: '',
    coverImage: null,
    content: '',
    editor: 'admin', // 可根据登录用户动态设置
})

const quillEditorRef = ref();
const content = ref(); //富文本绑定的值

// 保存内容方法
const saveContent = async () => {
    const loadingInstance = ElLoading.service({
        lock: true,
        text: '正在保存...',
        background: 'rgba(0, 0, 0, 0.7)'
    })

    try {
        const content = vditor.value.getValue()

        // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1000))

        // 实际使用时替换为:
        // const response = await fetch('/api/save', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json',
        //     'Authorization': `Bearer ${yourToken}`
        //   },
        //   body: JSON.stringify({ content })
        // });
        // if (!response.ok) throw new Error('保存失败');

        ElMessage.success('内容保存成功')
        console.log('保存的内容:', content)
    } catch (error) {
        ElMessage.error(`保存失败: ${error.message}`)
        console.error('保存失败:', error)
    } finally {
        loadingInstance.close()
    }
}

onMounted(() => {
    vditor.value = new Vditor('vditor', {
        mode: 'sv', // 编辑器模式
        debug: true, // 调试模式
        cache: { enable: false }, // 关闭缓存
        input: (text) => {
            editorContent.value = text // 内容同步
        },
        after: () => {
            vditor.value.setValue(editorContent.value) // 初始化内容
        },
        toolbar: [
            'bold',
            'italic',
            '|',
            'headings',
            'line',
            'quote',
            'list',
            '|',
            'upload',
            'link'
        ],
        toolbarConfig: {
            pin: true,  // 固定工具栏（滚动时保持可见）
            hide: false // 不隐藏工具栏
        },
        upload: {
            url: '/api/upload',
            fieldName: 'image',
            // setHeaders() {
            //     return {
            //         Authorization: `Bearer ${yourToken}`
            //     }
            // },
            resize: {  // ← 新增 resize 配置
                enable: true,
                position: 'bottom',
                after: (height) => {
                    console.log('调整后高度:', height)
                }
            },
            success(_, msg) {
                const res = JSON.parse(msg)
                vditor.value.insertValue(`![${res.data.name}](${res.data.url})`)
            }
        }

    })
})

onBeforeUnmount(() => {
    if (vditor.value) {
        vditor.value.destroy()
    }
})

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
.save-btn {
    margin-top: 20px;
}

/* 关键修改 - 确保容器正确居中 */
.article-add-container {
    padding: 30px;
    background-color: #ffffff;
    /* max-width: 1200px; */
    /* 使用max-width而不是固定width */
    width: 100%;
    /* 添加宽度100% */
    margin: 0 auto;
    box-sizing: border-box;
}

/* 确保父容器允许内容扩展 */
:deep(.el-main) {
    display: flex;
    justify-content: center;
}

/* 确保滚动容器不限制宽度 */
:deep(.main-scrollbar) {
    width: 100%;
    max-width: 1400px;
    /* 略大于内容容器 */
    padding: 0 20px;
}

h2 {
    margin-bottom: 20px;
    color: #333;
    text-align: center;
}

.el-form-item {
    margin-bottom: 20px;
}

/* 表单本身居中 */
.el-form {
    margin: 0 auto;
}
</style>