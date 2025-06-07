<template>
    <div class="about-me-container">
        <el-card>
            <template #header>
                <div class="card-header">
                    <span>关于我</span>
                    <el-button type="primary" @click="editMode = !editMode">
                        {{ editMode ? '取消编辑' : '编辑信息' }}
                    </el-button>
                </div>
            </template>

            <el-form :model="aboutData" label-position="top" v-if="editMode">
                <h3 class="edit-title">个人简介</h3>
                <el-form-item>
                    <el-input v-model="aboutData.introduction" type="textarea" :rows="5" placeholder="请输入个人简介" />
                </el-form-item>
                <h3 class="edit-title">联系方式</h3>
                <el-form-item>
                    <el-input v-model="aboutData.contact.email" placeholder="邮箱" style="margin-bottom: 10px" />
                    <el-input v-model="aboutData.contact.phone" placeholder="电话" style="margin-bottom: 10px" />
                    <el-input v-model="aboutData.contact.address" placeholder="地址" />
                </el-form-item>
                <h3 class="edit-title">为什么做这个技术博客</h3>

                <el-form-item>
                    <el-input v-model="aboutData.blogPurpose" type="textarea" :rows="4" placeholder="请说明创建技术博客的原因和目的" />
                </el-form-item>
                <h3 class="edit-title">博客使用的技术</h3>
                <el-form-item>
                    <el-tag v-for="(tech, index) in aboutData.technologies" :key="index" closable
                        @close="removeTech(index)" style="margin-right: 8px; margin-bottom: 8px">
                        {{ tech }}
                    </el-tag>
                    <el-input v-model="newTech" placeholder="输入技术名称后按回车添加" style="width: 200px"
                        @keyup.enter="addTech" />
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" @click="saveAboutInfo">保存</el-button>
                    <el-button @click="editMode = false">取消</el-button>
                </el-form-item>
            </el-form>

            <div v-else class="display-mode">
                <div class="section">
                    <h3>个人简介</h3>
                    <p class="content">{{ aboutData.introduction }}</p>
                </div>

                <div class="section">
                    <h3>联系方式</h3>
                    <p>邮箱: {{ aboutData.contact.email }}</p>
                    <p>电话: {{ aboutData.contact.phone }}</p>
                    <p>地址: {{ aboutData.contact.address }}</p>
                </div>

                <div class="section">
                    <h3>为什么做这个技术博客</h3>
                    <p class="content">{{ aboutData.blogPurpose }}</p>
                </div>

                <div class="section">
                    <h3>博客使用的技术</h3>
                    <div class="tech-tags">
                        <el-tag v-for="(tech, index) in aboutData.technologies" :key="index">
                            {{ tech }}
                        </el-tag>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

// 编辑模式状态
const editMode = ref(false)
// 新增技术输入
const newTech = ref('')

// 关于我数据
const aboutData = ref({
    introduction: '一枚热爱技术的开发者，专注于工程化与用户体验优化。\n前端开发：Vue.js 生态（Vue3 + Vite + Pinia）、组件化架构设计、响应式布局与动画实现\n全栈技术：MySQL 数据库开发与优化、Python 后端服务搭建（RESTful API）\n软件工程专业研究生在读，研究方向聚焦于智能交通领域的预测算法应用，探索交通流量预测等场景的工程化落地。\n学习之余喜欢记录技术探索过程，希望通过博客与更多开发者交流学习。',
    contact: {
        email: '1666955239@qq.com',
        phone: '',
        address: '厦门理工学院集美校区'
    },
    blogPurpose: `1. 知识沉淀：记录技术学习过程中的关键点，避免重复踩坑
2. 论文积累：将自己的研究成果以及学习的前沿科技论文以博客形式呈现，方便自己他人总结学习
3. 交流成长：通过评论互动获取不同视角的技术见解，促进自我提升
4. 记录生活：用博客记录生活中的点滴，让生活更有意义`,
    technologies: [
        'Vue 3',
        'Vue Router',
        'Pinia',
        'Element Plus',
        'Vite',
        'MySQL',
        'Python',
        'Git',
        'PNPM'
    ]
})

// 初始化时从服务器获取数据
onMounted(async () => {
    try {
        // const response = await fetch('/api/about-me')
        // aboutData.value = await response.json()
    } catch (error) {
        ElMessage.error('获取关于我信息失败: ' + error.message)
    }
})

// 添加技术
const addTech = () => {
    if (newTech.value.trim() && !aboutData.value.technologies.includes(newTech.value)) {
        aboutData.value.technologies.push(newTech.value)
        newTech.value = ''
    }
}

// 移除技术
const removeTech = (index) => {
    aboutData.value.technologies.splice(index, 1)
}

// 保存信息
const saveAboutInfo = async () => {
    try {
        // await fetch('/api/about-me', {
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/json'
        //   },
        //   body: JSON.stringify(aboutData.value)
        // })
        ElMessage.success('保存成功')
        editMode.value = false
    } catch (error) {
        ElMessage.error('保存失败: ' + error.message)
    }
}
</script>

<style scoped>
.about-me-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.section {
    margin-bottom: 24px;
}

.section h3 {
    color: #409eff;
    margin-bottom: 12px;
}

.content {
    white-space: pre-line;
    line-height: 1.6;
}

.tech-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.el-tag {
    margin-right: 8px;
    margin-bottom: 8px;
}

.edit-title {
    margin-bottom: 1rem;
}
</style>