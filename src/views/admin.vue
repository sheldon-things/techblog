<template>
    <div class="common-layout">
        <el-container>
            <NavBar ref="navbar" />
            <!-- 只有登录才显示管理布局 -->
            <el-container v-if="isLoggedIn" class="admin-container">
                <el-main>
                    <el-container class="layout-container-demo" style="height: 750px">
                        <el-aside width="200px">
                            <el-scrollbar>
                                <el-menu :unique-opened="true">
                                    <el-sub-menu index="1">
                                        <template #title>
                                            <el-icon>
                                                <House />
                                            </el-icon>首页管理
                                        </template>
                                        <el-menu-item index="1-1" @click="handleMenuClick('1-1')">
                                            - 更换背景图
                                        </el-menu-item>
                                        <el-menu-item index="1-2" @click="handleMenuClick('1-2')">
                                            - 修改联系方式
                                        </el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="2">
                                        <template #title>
                                            <el-icon>
                                                <Notebook />
                                            </el-icon>
                                            文章管理
                                        </template>
                                        <el-menu-item index="2-1" @click="handleMenuClick('2-1')">- 添加</el-menu-item>
                                        <el-menu-item index="2-2" @click="handleMenuClick('2-2')">- 删除</el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="3">
                                        <template #title>
                                            <el-icon>
                                                <DocumentCopy />
                                            </el-icon>论文管理
                                        </template>
                                        <el-menu-item index="3-1" @click="handleMenuClick('3-1')">- 添加</el-menu-item>
                                        <el-menu-item index="3-2" @click="handleMenuClick('3-2')">- 删除</el-menu-item>
                                    </el-sub-menu>

                                    <el-sub-menu index="4">
                                        <template #title>
                                            <el-icon>
                                                <el-icon>
                                                    <Picture />
                                                </el-icon>
                                            </el-icon>图库管理
                                        </template>
                                        <el-menu-item index="4-1" @click="handleMenuClick('4-1')">- 添加</el-menu-item>
                                        <el-menu-item index="4-2" @click="handleMenuClick('4-2')">- 删除</el-menu-item>

                                    </el-sub-menu>

                                    <el-sub-menu index="5">
                                        <template #title>
                                            <el-icon>
                                                <User />
                                            </el-icon>关于我
                                        </template>
                                        <el-menu-item index="5-1" @click="handleMenuClick('5-1')">- 修改内容</el-menu-item>
                                    </el-sub-menu>

                                    <el-sub-menu index="6">
                                        <template #title>
                                            <el-icon>
                                                <ChatDotRound />
                                            </el-icon>留言墙
                                        </template>
                                        <el-menu-item index="6-1" @click="handleMenuClick('6-1')">查看留言</el-menu-item>
                                    </el-sub-menu>

                                    <el-sub-menu index="7">
                                        <template #title>
                                            <el-icon>
                                                <Message />
                                            </el-icon>联系我
                                        </template>
                                        <el-menu-item index="7-1" @click="handleMenuClick('7-1')">新消息</el-menu-item>
                                    </el-sub-menu>
                                </el-menu>
                            </el-scrollbar>
                        </el-aside>

                        <el-container>
                            <el-header style="text-align: right; font-size: 12px">
                                <div class="toolbar">
                                    <el-dropdown>
                                        <el-icon style="margin-right: 8px; margin-top: 1px">
                                            <setting />
                                        </el-icon>
                                        <template #dropdown>
                                            <el-dropdown-menu>
                                                <el-dropdown-item>修改设置</el-dropdown-item>
                                                <el-dropdown-item>重置密码</el-dropdown-item>
                                                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                    <span>Admin</span>
                                </div>
                            </el-header>

                            <el-main>
                                <el-scrollbar class="main-scrollbar">
                                    <!-- 动态组件区域 -->
                                    <component :is="activeComponent" />

                                    <!-- 默认显示内容 -->
                                    <div v-if="!activeComponent" class="default-content">
                                        <h1>欢迎使用管理后台</h1>
                                        <p>请从左侧菜单选择管理项目</p>
                                    </div>
                                </el-scrollbar>
                            </el-main>
                        </el-container>
                    </el-container>

                </el-main>
            </el-container>

            <div v-else class="login-wrapper">
                <!-- 左侧图片区域 -->
                <div class="left-container">
                </div>

                <div class="right-container">
                    <div class="login-form">
                        <h2>管理员登录</h2>
                        <el-form ref="form" :model="loginForm" :rules="rules">
                            <el-form-item label="账号" prop="username">
                                <el-input v-model="loginForm.username" />
                            </el-form-item>

                            <el-form-item label="密码" prop="password">
                                <el-input v-model="loginForm.password" type="password" show-password />
                            </el-form-item>

                            <el-form-item prop="remember" class="remember-me-right">
                                <el-checkbox v-model:checked="loginForm.remember">记住我</el-checkbox>
                            </el-form-item>

                            <el-form-item>
                                <el-button type="primary" class="login_btn" @click="handleLogin" style="width: 100%">
                                    登录
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>


        </el-container>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, shallowRef } from 'vue'
import { ElMessage } from 'element-plus'
import { House, Notebook, DocumentCopy, Picture, User, ChatDotRound, Message, Setting } from '@element-plus/icons-vue'

// 导入各个管理组件
import BackgroundManage from '../components/admin/BackgroundManage.vue'
import AboutMe from '../components/admin/AboutMe.vue'
import MessageWall from '../components/admin/MessageWall.vue'
import ContactMe from '../components/admin/ContactMe.vue'
import ArticleAdd from '../components/admin/ArticleAdd.vue'
import ArticleDelete from '../components/admin/ArticleDelete.vue'
import PaperAdd from '../components/admin/PaperAdd.vue'
import PaperDelete from '../components/admin/PaperDelete.vue'
import GalleryAdd from '../components/admin/GalleryAdd.vue'
import GalleryDelete from '../components/admin/GalleryDelete.vue'

// 当前激活的组件
const activeComponent = shallowRef(null)

import NavBar from '../components/NavBar.vue'
// 菜单点击处理
const handleMenuClick = (index: string) => {
    switch (index) {
        case '1-1':
            activeComponent.value = BackgroundManage
            break
        case '1-2':
            activeComponent.value = ContactMe
            break
        case '2-1':
            activeComponent.value = ArticleAdd
            break
        case '2-2':
            activeComponent.value = ArticleDelete
            break
        case '3-1':
            activeComponent.value = PaperAdd
            break
        case '3-2':
            activeComponent.value = PaperDelete
            break
        case '4-1':
            activeComponent.value = GalleryAdd
            break
        case '4-2':
            activeComponent.value = GalleryDelete
            break
        case '5-1':
            activeComponent.value = AboutMe
            break
        case '6-1':
            activeComponent.value = MessageWall
            break
        case '7-1':
            activeComponent.value = ContactMe
            break
        default:
            activeComponent.value = null
    }
}

const loginForm = ref({
    username: '',
    password: '',
    remember: false
})

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ]
}

const handleLogin = () => {
    const { username, password } = loginForm.value

    if (username === 'admin' && password === '123456') {
        localStorage.setItem('adminToken', 'authenticated')
        isLoggedIn.value = true
    } else {
        alert('用户名或密码错误')
    }
}

const isLoggedIn = ref(false)

onMounted(() => {
    // 页面加载时检查登录状态
    const token = localStorage.getItem('adminToken')
    if (token) {
        isLoggedIn.value = true
    }
})

const handleLogout = () => {
    localStorage.removeItem('adminToken');
    ElMessage.success('您已成功退出登录');
    // 刷新页面
    setTimeout(() => {
        isLoggedIn.value = false;
        window.location.reload();
    }, 2000);
}

</script>

<style scoped>
.login-wrapper {
    display: flex;
    width: 100%;
    height: 100vh;
    background-color: #ffffff;
}

.left-container {
    width: 50%;
    height: 100vh;
    background: url('/static/hero.jpg') no-repeat;
    background-position: center;
    background-size: cover;
}

.right-container {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    width: 400px;
    height: 23rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

/* 保留其他原有样式不变 */
.layout-container-demo .el-header {
    position: relative;
    /* background-color: var(--el-color-primary-light-7); */
    background-color: rgba(148, 169, 221, 0.5) !important;
    /* 强制生效 */
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    /* background: var(--el-color-primary-light-8); */
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

/* .el-container {
    height: 100%;
    width: 100%;
} */

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.login-form h2 {
    margin: 2rem 0;
}

.login_btn {
    background: linear-gradient(90deg, #00d4ff, #7a00ff);
    border: none;
    color: white;
    font-weight: bold;
    transition: all 0.3s ease;
}

.login_btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
}

.remember-me-right {
    margin-left: 6rem;
}

.admin-container {
    margin-top: 60px;
    height: 100%;
    width: 100%;
}

.default-content {
    text-align: center;
    padding-top: 100px;
    color: #666;
}

.el-menu-item {
    padding-left: 3rem !important;
}

.main-scrollbar {
    padding-top: 10px;
    padding-left: 10px;
}
</style>