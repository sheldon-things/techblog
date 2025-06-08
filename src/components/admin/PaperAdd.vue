<template>
    <div id="vditor" style="min-height: 50vh;"></div>
    <el-button type="primary" @click="saveContent" class="save-btn">保存论文</el-button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import { ElMessage, ElLoading } from 'element-plus'


const editorContent = ref('')
const vditor = ref(null)

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
</script>

<style scoped>
.save-btn {
    margin-top: 20px;
}
</style>