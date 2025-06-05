<template>
    <div class="article">
        <NavBar ref="navbar" />

        <div class="article-list container">
            <!-- 大文章展示 -->
            <div class="article-content-big">
                <img src="../../static/post.jpeg" alt="文章封面" class="big-image" />
                <h1 class="title">这里是文章的大标题</h1>
                <p class="meta"><span>2025-04-05</span></p>
                <p class="content">
                    这是文章的详细内容摘要，可以展示一些关键段落或介绍文字。
                </p>
            </div>

            <!-- 小文章卡片列表 -->
            <div class="article-content-small" v-for="(post, index) in posts" :key="index">
                <div class="card">
                    <img :src="post.thumbnail" alt="缩略图" class="thumbnail" />
                    <div class="card-body">
                        <h3 class="card-title">{{ post.title }}</h3>
                        <p class="card-meta">{{ post.date }}</p>
                        <p class="card-excerpt">{{ post.excerpt }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { ref, onMounted } from 'vue'

const navbar = ref(null)
const posts = ref([
    {
        title: '技术探索之旅 #1',
        date: '2025-04-01',
        excerpt: '深入理解现代前端架构与工程实践的核心要点。',
        thumbnail: '/static/post.jpeg'
    },
    {
        title: '技术探索之旅 #2',
        date: '2025-04-02',
        excerpt: '构建可维护和高性能 Vue 应用的最佳实践。',
        thumbnail: '/static/post.jpeg'
    },
    {
        title: '技术探索之旅 #3',
        date: '2025-04-03',
        excerpt: '探讨 Web 性能优化策略与工具链配置技巧。',
        thumbnail: '/static/post.jpeg'
    }
])

const handleScroll = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop
    const navbarElement = navbar.value?.$el || navbar.value

    if (scrollTop > 0) {
        const opacity = Math.min(scrollTop / 300, 0.9)
        navbarElement.style.backgroundColor = `rgba(255, 255, 255, ${opacity})`
        navbarElement.style.backdropFilter = `blur(${Math.min(opacity * 10, 10)}px)`
        navbarElement.style.borderBottom = '1px solid rgba(0, 0, 0, 0.1)'

        // 使用 setProperty 设置 !important 样式
        navbarElement.querySelectorAll('.el-menu-item').forEach(item => {
            item.style.setProperty('color', '#000000', 'important')
        })

        navbarElement.style.position = 'fixed'
        navbarElement.style.top = '0'
        navbarElement.style.width = '100%'
        navbarElement.style.zIndex = '1000'
    } else {
        navbarElement.style.backgroundColor = 'transparent'
        navbarElement.style.backdropFilter = 'blur(0px)'
        navbarElement.style.borderBottom = 'none'

        // 恢复白色字体
        navbarElement.querySelectorAll('.el-menu-item').forEach(item => {
            item.style.setProperty('color', '#ffffff', 'important')
        })

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
    background-color: rgba(44, 41, 41, 0.2);
    width: 100%;
    padding-top: 60px;
    font-family: 'Inter', sans-serif;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem 1rem;
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
</style>