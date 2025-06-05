<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo navbar" mode="horizontal" :ellipsis="false"
        @select="handleSelect" ref="navbar">
        <el-menu-item index="0">
            <img style="width: 50px" src="../../static/logo.png" alt="Element logo" />
        </el-menu-item>
        <el-menu-item index="1">
            <router-link to="/" style="display: block; width: 100%;">首页</router-link>
        </el-menu-item>
        <el-menu-item index="2">
            <router-link to="/article" style="display: block; width: 100%;">文章</router-link>
        </el-menu-item>
        <el-menu-item index="4">图库</el-menu-item>
        <el-menu-item index="5">后台管理</el-menu-item>
        <el-menu-item index="6">关于</el-menu-item>
        <div class="search-box">
            <input type="text" placeholder="搜索文章/图库/日记/资源" />
            <button class="search-button">搜索</button>
        </div>
    </el-menu>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const activeIndex = ref('1')
const navbar = ref(null)

// 监听路由变化，设置 activeIndex
watch(
    () => route.path,
    (newPath) => {
        if (newPath === '/article') {
            activeIndex.value = '2'
        } else {
            activeIndex.value = '1' // 或者根据路径匹配更多页面
        }
    },
    { immediate: true }
)
const handleSelect = (key, keyPath) => {
    console.log(key, keyPath)
}
</script>

<style scoped>
/* 将原 index.vue 中与 el-menu 相关的样式复制过来 */

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
    color: white !important;
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
</style>