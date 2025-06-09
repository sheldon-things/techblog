<template>
    <!-- 移动端专用导航栏 -->
    <div class="mobile-navbar" v-if="isMobile">
        <div class="mobile-navbar-header">
            <img class="mobile-logo" src="../../static/logo.png" alt="Logo" />
            <el-button class="mobile-menu-btn" @click="toggleMenu">
                <el-icon>
                    <Menu />
                </el-icon>
            </el-button>
        </div>

        <!-- 折叠菜单 -->
        <!-- <div class="mobile-menu" :class="{ 'mobile-menu-active': menuVisible }">
            <router-link v-for="item in navItems_mobile" :key="item.index" :to="item.path" class="mobile-menu-item"
                @click="menuVisible = false">
                {{ item.title }}
            </router-link>
        </div> -->

        <!-- 优化后的折叠菜单 -->
        <div class="mobile-menu" :class="{ 'mobile-menu-active': menuVisible }">
            <div class="mobile-menu-grid">
                <router-link v-for="item in navItems_mobile" :key="item.index" :to="item.path" class="mobile-menu-item"
                    @click="menuVisible = false">
                    <el-icon class="menu-icon">
                        <component :is="item.icon" />
                    </el-icon>
                    <span class="menu-text">{{ item.title }}</span>
                </router-link>
            </div>
        </div>
    </div>

    <!-- 电脑端保持原样 -->
    <el-menu v-else :default-active="activeIndex" class="el-menu-demo navbar" mode="horizontal" :ellipsis="false"
        @select="handleSelect">
        <!-- 原有电脑端导航内容 -->
        <el-menu-item index="0">
            <img style="width: 50px" src="../../static/logo.png" alt="Element logo" />
        </el-menu-item>
        <el-menu-item index="1">
            <router-link to="/" style="display: block; width: 100%;">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/paper" style="display: block; width: 100%;">论文</router-link>
        </el-menu-item>
        <el-menu-item index="3">
            <router-link to="/article" style="display: block; width: 100%;">文章</router-link>
        </el-menu-item>
        <el-menu-item index="4">
            <router-link to="/gallery" style="display: block; width: 100%;">图库</router-link>
        </el-menu-item>
        <el-menu-item index="5">
            <router-link to="/admin" style="display: block; width: 100%;">后台管理</router-link>
        </el-menu-item>
        <el-menu-item index="6">
            <router-link to="/about" style="display: block; width: 100%;">关于我</router-link>
        </el-menu-item>
        <div class="search-box">
            <input type="text" placeholder="搜索文章/图库/日记/资源" />
            <button class="search-button">搜索</button>
        </div>
    </el-menu>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import {
    Menu,
    HomeFilled,
    Notebook,
    Document,
    Picture,
    User,
    Search,
    Setting
} from '@element-plus/icons-vue'

const route = useRoute()
const activeIndex = ref('1')
const isMobile = ref(false)
const menuVisible = ref(false)

const navItems = [
    { index: '1', path: '/', title: '首页' },
    { index: '2', path: '/paper', title: '论文' },
    { index: '3', path: '/article', title: '文章' },
    { index: '4', path: '/gallery', title: '图库' },
    { index: '5', path: '/admin', title: '后台管理' },
    { index: '6', path: '/about', title: '关于我' }
]

const navItems_mobile = [
    { index: '1', path: '/', title: '首页', icon: HomeFilled },
    { index: '2', path: '/paper', title: '论文', icon: Notebook },
    { index: '3', path: '/article', title: '文章', icon: Document },
    { index: '4', path: '/gallery', title: '图库', icon: Picture },
    { index: '5', path: '/admin', title: '后台管理', icon: Setting },
    { index: '6', path: '/about', title: '关于', icon: User }
]

const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

const toggleMenu = () => {
    menuVisible.value = !menuVisible.value
}

// 监听路由变化
watch(
    () => route.path,
    (newPath) => {
        const item = navItems.find(item => item.path === newPath)
        activeIndex.value = item ? item.index : '1'
    },
    { immediate: true }
)

onMounted(() => {
    checkMobile()
    window.addEventListener('resize', checkMobile)
})
</script>

<style scoped>
.el-menu-demo.navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background-color: transparent !important;
    padding: 0.5rem 1rem;
    transition: background-color 0.3s ease, color 0.3s ease, backdrop-filter 0.3s ease;
    backdrop-filter: blur(0px);
    -webkit-backdrop-filter: blur(0px);
    border-bottom: none !important;
    display: flex;
    justify-content: center;
    align-items: center;
}

.el-menu--horizontal.el-menu-demo.navbar>.el-menu-item {
    color: rgb(0, 0, 0) !important;
    padding: 0.3rem 0.8rem !important;
    border-radius: 5px;
    transition: all 0.3s ease;
    font-size: 0.95rem;
    height: auto !important;
    line-height: normal !important;
    margin: 0 0.5rem !important;
}

.el-menu--horizontal.el-menu-demo.navbar>.el-menu-item:hover {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: black !important;
}

.el-menu-demo.navbar.transparent {
    background-color: transparent !important;
    backdrop-filter: blur(0px) !important;
    border-bottom: none !important;
}

.search-box {
    margin-left: auto;
    display: flex;
}

.search-box input {
    padding: 0.5rem;
    border: 1px solid #444;
    border-radius: 4px 0 0 4px;
    background: transparent;
    color: white;
    min-width: 200px;
}

.search-button {
    padding: 0.5rem 1rem;
    background: #00d4ff;
    color: white;
    border: none;
    border-radius: 0 4px 4px 0;
    cursor: pointer;
}

/* 移动端样式 */
.mobile-menu-btn {
    display: none;
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 1100;
    background: rgba(255, 255, 255, 0.8);
}

.mobile-hidden {
    display: none !important;
}

@media (max-width: 768px) {
    .mobile-menu-btn {
        display: block;
    }

    .el-menu-demo.navbar {
        flex-direction: column;
        position: fixed;
        top: 60px;
        left: 0;
        width: 100%;
        background: rgba(0, 0, 0, 0.9) !important;
        backdrop-filter: blur(10px);
        padding: 10px 0;
    }

    .el-menu--horizontal.el-menu-demo.navbar>.el-menu-item {
        width: 100%;
        margin: 0.2rem 0 !important;
        text-align: center;
    }

    .search-box {
        order: 2;
        width: 90%;
        margin: 0.5rem auto;
        justify-content: center;
    }

    .search-box input {
        width: 70%;
        min-width: unset;
    }

    .el-menu-item img {
        width: 40px !important;
    }
}


/* 优化后的移动端样式 */
.mobile-navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 1000;
    background: rgba(222, 221, 221, 0.7);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.1);
}

.mobile-navbar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 12px;
    height: 50px;
}

.mobile-logo {
    width: 36px;
    height: 36px;
}

.mobile-menu-btn {
    padding: 6px;
    border: none;
    background: transparent;
    color: #333;
    font-size: 20px;
}

.mobile-menu {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease-out;
    background: rgba(222, 221, 221, 0.8);
}

.mobile-menu-active {
    max-height: 200px;
    /* border-top: 1px solid #f0f0f0; */
}

.mobile-menu-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
    padding: 12px;
}

.mobile-menu-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 8px;
    color: #333;
    text-decoration: none;
    border-radius: 6px;
    transition: background 0.2s;
    min-height: 72px;
}

.mobile-menu-item:active {
    background: #f5f5f5;
}

.menu-icon {
    font-size: 24px;
    margin-bottom: 6px;
    color: #000000;
}

.menu-text {
    font-size: 12px;
    text-align: center;
}

/* 手机竖屏时调整为2列 */
/* 原有400px断点的样式保持 */
@media (max-width: 400px) {
    .mobile-menu-grid {
        grid-template-columns: repeat(2, 1fr);
    }

    /* 新增：增大下拉菜单高度 */
    .mobile-menu-active {
        max-height: 300px;
        /* 从200px增加到300px */
        overflow-y: auto;
        /* 添加滚动以防内容过多 */
    }

    /* 可选：增大菜单项高度 */
    .mobile-menu-item {
        min-height: 80px;
        /* 从72px增加到80px */
    }
}
</style>