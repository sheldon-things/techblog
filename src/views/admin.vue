<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <NavBar ref="navbar" />
            </el-header>

            <!-- 只有登录才显示管理布局 -->
            <el-container v-if="isLoggedIn">
                <el-main>
                    <el-container class="layout-container-demo" style="height: 500px">
                        <el-aside width="200px">
                            <el-scrollbar>
                                <el-menu>
                                    <el-sub-menu index="1">
                                        <template #title>
                                            <el-icon>
                                                <message />
                                            </el-icon>首页管理
                                        </template>
                                        <el-menu-item index="1-1">Option 1</el-menu-item>
                                        <el-menu-item index="1-2">Option 2</el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="2">
                                        <template #title>
                                            <el-icon><icon-menu /></el-icon>文章管理
                                        </template>
                                        <el-menu-item index="2-1">Option 1</el-menu-item>
                                        <el-menu-item index="2-2">Option 2</el-menu-item>
                                    </el-sub-menu>
                                    <el-sub-menu index="3">
                                        <template #title>
                                            <el-icon>
                                                <setting />
                                            </el-icon>论文管理
                                        </template>
                                        <el-menu-item index="3-1">Option 1</el-menu-item>
                                        <el-menu-item index="3-2">Option 2</el-menu-item>
                                    </el-sub-menu>

                                    <el-sub-menu index="4">
                                        <template #title>
                                            <el-icon>
                                                <setting />
                                            </el-icon>图库管理
                                        </template>
                                        <el-menu-item index="4-1">Option 1</el-menu-item>
                                        <el-menu-item index="4-2">Option 2</el-menu-item>

                                    </el-sub-menu>

                                    <el-sub-menu index="5">
                                        <template #title>
                                            <el-icon>
                                                <setting />
                                            </el-icon>关于我
                                        </template>
                                        <el-menu-item index="5-1">Option 1</el-menu-item>
                                        <el-menu-item index="5-2">Option 2</el-menu-item>

                                    </el-sub-menu>

                                    <el-sub-menu index="6">
                                        <template #title>
                                            <el-icon>
                                                <setting />
                                            </el-icon>留言墙
                                        </template>
                                        <el-menu-item index="6-1">Option 1</el-menu-item>
                                        <el-menu-item index="6-2">Option 2</el-menu-item>

                                    </el-sub-menu>

                                    <el-sub-menu index="7">
                                        <template #title>
                                            <el-icon>
                                                <setting />
                                            </el-icon>联系我
                                        </template>
                                        <el-menu-item index="7-1">Option 1</el-menu-item>
                                        <el-menu-item index="7-2">Option 2</el-menu-item>

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
                                                <el-dropdown-item>View</el-dropdown-item>
                                                <el-dropdown-item>Add</el-dropdown-item>
                                                <el-dropdown-item>Delete</el-dropdown-item>
                                            </el-dropdown-menu>
                                        </template>
                                    </el-dropdown>
                                    <span>Tom</span>
                                </div>
                            </el-header>

                            <el-main>
                                <el-scrollbar>
                                    <h1>nihao</h1>
                                </el-scrollbar>
                            </el-main>
                        </el-container>
                    </el-container>

                </el-main>
            </el-container>


            <!-- 未登录时显示登录表单 -->
            <div v-else class="login-wrapper">
                <div class="login-form">
                    <h2>管理员登录</h2>
                    <el-form @submit.prevent="handleLogin">
                        <el-form-item label="用户名">
                            <el-input v-model="loginForm.username" />
                        </el-form-item>
                        <el-form-item label="密码">
                            <el-input v-model="loginForm.password" type="password" show-password />
                        </el-form-item>
                        <el-button type="primary" native-type="submit" style="width: 100%">登录</el-button>
                    </el-form>
                </div>
            </div>



        </el-container>
    </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { Menu as IconMenu, Message, Setting } from '@element-plus/icons-vue'
import NavBar from '../components/NavBar.vue'

const loginForm = ref({
    username: '',
    password: ''
})
const isLoggedIn = ref(false)

// 模拟登录校验逻辑
const handleLogin = () => {
    const { username, password } = loginForm.value

    // 这里可以替换为真实 API 请求
    if (username === 'admin' && password === '123456') {
        localStorage.setItem('adminToken', 'authenticated')
        isLoggedIn.value = true
    } else {
        alert('用户名或密码错误')
    }
}

onMounted(() => {
    // 页面加载时检查登录状态
    const token = localStorage.getItem('adminToken')
    if (token) {
        isLoggedIn.value = true
    }
})

</script>

<style scoped>
.layout-container-demo .el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.layout-container-demo .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
}

.layout-container-demo .el-menu {
    border-right: none;
}

.layout-container-demo .el-main {
    padding: 0;
}

.layout-container-demo .toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}

.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f7fa;
}

.login-form {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 400px;
}
</style>