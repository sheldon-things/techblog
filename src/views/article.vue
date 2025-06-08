<template>
    <div class="article">
        <NavBar ref="navbar" />

        <div class="article-list container">
            <!-- 大文章展示 -->
            <!-- <div class="article-content-big">
                <img src="../../static/post.jpeg" alt="文章封面" class="big-image" />
            </div>

            <div class="article-content-small" v-for="(post, index) in posts" :key="index" @click="openDrawer(post)">
                <div class="card">
                    <img :src="post.thumbnail" alt="缩略图" class="thumbnail" />
                    <div class="card-body">
                        <h3 class="card-title">{{ post.title }}</h3>
                        <p class="card-meta">{{ post.date }}</p>
                        <p class="card-excerpt">{{ post.excerpt }}</p>
                    </div>
                </div>
            </div> -->

            <!-- 小文章卡片列表 -->
            <div class="post-cards">
                <div class="post-card" v-for="(post, index) in posts" :key="index" @click="openDrawer(post)">
                    <div class="post-image" :style="{ backgroundImage: 'url(' + post.thumbnail + ')' }"></div>
                    <div class="post-info">
                        <h3 class="post-title">{{ post.title }}</h3>
                        <p class="post-excerpt">{{ post.excerpt }}</p>
                        <a href="#" class="read-more">阅读更多 →</a>
                    </div>
                </div>
            </div>
        </div>



        <el-drawer v-model="drawerVisible" title="文章详情" :with-header="false" size="40%">
            <div v-if="selectedPost" class="paper-detail">
                <h3>{{ selectedPost.title }}</h3>
                <p class="title-en">{{ selectedPost.date }}</p>
                <el-divider />
                <div class="detail-item">
                    <span class="label">标题：</span>
                    <span>{{ selectedPost.title }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">发布日期：</span>
                    <span>{{ selectedPost.date }}</span>
                </div>
                <div class="detail-item">
                    <span class="label">摘要：</span>
                    <span>{{ selectedPost.excerpt }}</span>
                </div>
                <el-divider />
                <div class="thumbnail-container">
                    <h4>文章封面</h4>
                    <img :src="selectedPost.thumbnail" :alt="selectedPost.title" class="thumbnail" />
                </div>
            </div>
        </el-drawer>
    </div>
</template>

<script setup>
import { API_BASE_URL, IMAGE_BASE_URL } from '@/config'

import NavBar from '../components/NavBar.vue'
import { ref, onMounted } from 'vue'
const drawerVisible = ref(false)
const selectedPost = ref(null)
const navbar = ref(null)
const posts = ref([
    {
        title: 'Vite+Vue的学习路线 #1',
        excerpt: '全面规划学习路径，从基础到高级，逐步深入。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/ij.webp`,
    },
    {
        title: 'intellij的maven报错 #2',
        excerpt: '详细解决maven配置问题，确保项目正常运行。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/pdformer.webp`,
    },
    {
        title: '交通预测+深度学习 #3',
        excerpt: '分享交通预测项目的实战经验，深入了解深度学习技术。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/vuevite.webp`,
    }, 
    {
        title: 'Vite+Vue的学习路线 #1',
        excerpt: '全面规划学习路径，从基础到高级，逐步深入。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/ij.webp`,
    },
    {
        title: 'intellij的maven报错 #2',
        excerpt: '详细解决maven配置问题，确保项目正常运行。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/pdformer.webp`,
    },
    {
        title: '交通预测+深度学习 #3',
        excerpt: '分享交通预测项目的实战经验，深入了解深度学习技术。',
        thumbnail: `${IMAGE_BASE_URL}/index/index-article/vuevite.webp`,
    }
])


const openDrawer = (post) => {
    selectedPost.value = post
    drawerVisible.value = true
}

const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const navbarElement = navbar.value?.$el || navbar.value

    if (scrollTop > 0) {
        const opacity = Math.min(scrollTop / 300, 0.9)
        navbarElement.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`
        navbarElement.style.backdropFilter = `blur(${Math.min(opacity * 10, 10)}px)`
        navbarElement.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'

        // 使用 setProperty 设置 !important 样式
        // navbarElement.querySelectorAll('.el-menu-item').forEach(item => {
        //     item.style.setProperty('color', '#000000', 'important')
        // })

        navbarElement.style.position = 'fixed'
        navbarElement.style.top = '0'
        navbarElement.style.width = '100%'
        navbarElement.style.zIndex = '1000'
    } else {
        navbarElement.style.backgroundColor = 'transparent'
        navbarElement.style.backdropFilter = 'blur(0px)'
        navbarElement.style.borderBottom = 'none'

        // 恢复白色字体
        // navbarElement.querySelectorAll('.el-menu-item').forEach(item => {
        //     item.style.setProperty('color', '#ffffff', 'important')
        // })

        navbarElement.style.position = 'absolute'
        navbarElement.style.top = '0'
    }
}

onMounted(() => {
    window.addEventListener('scroll', handleScroll)
})

</script>

<style scoped>
.article {
    background-color: white;
    width: 100%;
    padding-top: 60px;
    font-family: 'Inter', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0.5rem 1rem;
}

/* 大文章样式 */
.article-content-big {
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    margin-bottom: 2rem;
    padding: 1rem;
}

.big-image {
    width: 100%;
    height: 400px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 1rem;
}

.title {
    font-size: 2rem;
    color: #333;
    margin-bottom: 0.5rem;
}

.meta {
    font-size: 0.9rem;
    color: #888;
    margin-bottom: 1rem;
}

.content {
    font-size: 1rem;
    line-height: 1.6;
    color: #555;
}

/* 小文章卡片样式 */
.article-content-small {
    margin-bottom: 1rem;
}

.card {
    display: flex;
    align-items: center;
    background-color: #ffffff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
    padding: 1rem;
}

.card:hover {
    transform: translateY(-2px);
}

.thumbnail {
    width: 150px;
    height: 100px;
    object-fit: cover;
    border-radius: 8px;
    margin-right: 1rem;
}

.card-body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.card-title {
    font-size: 1.2rem;
    color: #333;
    margin: 0;
}

.card-meta {
    font-size: 0.9rem;
    color: #999;
    margin: 0.5rem 0;
}

.card-excerpt {
    font-size: 0.95rem;
    color: #666;
}

/* 抽屉内容样式 */
.paper-detail {
    padding: 20px;
}

.detail-item {
    margin: 15px 0;
    display: flex;
    align-items: center;
}

.detail-item .label {
    font-weight: bold;
    width: 80px;
    color: #666;
}

.thumbnail-container {
    margin-top: 20px;
    text-align: center;
}

.thumbnail {
    max-width: 100%;
    max-height: 300px;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 文章卡片容器 */
.post-cards {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
    margin-top: 2rem;
}

/* 博客卡片样式 */
.post-card {
    background-color: rgba(255, 255, 255, 0.4);
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    backdrop-filter: blur(5px);
    height: 25rem;
    display: flex;
    flex-direction: column;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}

/* 图片部分 */
.post-image {
    height: 220px;
    background-size: cover;
    background-position: center;
    border-radius: 10px 10px 0 0;
}

/* 内容信息部分 */
.post-info {
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: rgb(0, 0, 0);
    flex-grow: 1;
}

.post-title {
    font-size: 1.5rem;
    color: #000000;
    margin-bottom: 0.5rem;
    line-height: 1.4;
}

.post-excerpt {
    font-size: 0.95rem;
    color: #1b1818;
    margin-bottom: 1rem;
    line-height: 1.6;
}

.read-more {
    align-self: flex-start;
    font-weight: bold;
    color: #000000;
    text-decoration: none;
    transition: color 0.3s ease;
}

.read-more:hover {
    color: #f54747;
}
</style>