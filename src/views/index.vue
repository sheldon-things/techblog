<template>
  <div class="container">

    <!-- 导航栏 -->
    <div class="hero-wrapper">
      <NavBar ref="navbar" />
      <!-- 全屏大图背景 -->
      <div class="hero-image" :style="{
        backgroundImage: `url(${IMAGE_BASE_URL}/index/hero.webp)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }">
        <div class="hero-text">
          <h1 class="hero-title">呼吸，破坏，重复</h1>
          <button class="next-button" @click="scrollToContent">下一页</button>
        </div>
      </div>
    </div>

    <!-- 文章概览区域 - 移动端专用 -->
    <div v-if="isMobile" class="mobile-post-list">
      <div class="subtitle">热门文章</div>
      <ul class="post-list">
        <li v-for="(post, index) in posts" :key="index" class="post-item">
          <router-link :to="'/article/' + post.id" class="post-link">
            <div class="post-meta">
              <!-- <span class="post-index">#{{ index + 1 }}</span> -->
            </div>
            <!-- <h3 class="post-title">{{ post.title }}</h3> -->
            <p class="post-excerpt">{{ post.excerpt }}</p>
            <div class="post-footer">
              <span class="read-more">阅读全文</span>
              <span class="post-date">2023-10-15</span>
              <span class="comment-count">12评论</span>
            </div>
          </router-link>
        </li>
      </ul>
    </div>

    <!-- 文章概览区域 -->
    <div v-else id="content-section" class="content-section">
      <!-- 博客卡片 -->
      <div class="subtitle">热门文章</div>
      <!-- 博客卡片 -->
      <div class="post-card" v-for="(post, index) in posts" :key="index">
        <div class="post-image" :style="{ backgroundImage: 'url(' + post.image + ')' }"></div>
        <div class="post-info">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <a href="#" class="read-more">阅读更多 →</a>
        </div>
      </div>

      <!-- 轮播区：占据左侧两列 -->
      <div class="swipper-wrapper">
        <div class="swipper text-center">
          <el-carousel class="swipper-el-carousel" height="300px" motion-blur>
            <el-carousel-item v-for="(image, index) in carouselImages" :key="index">
              <img :src="image" alt="carousel-image" class="carousel-image" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>

      <!-- 右侧上部卡片 -->
      <div class="right-card right-card-top">
        <h3>页面访问人数</h3>
        <p>{{ visitorCount }} 人已访问</p>
        <h2>留言人数</h2>
        <p>{{ likeCount }} 人已访问</p>
      </div>

    </div>


    <!-- 随记 -->
    <div class="gallery" :style="galleryBackgroundStyle" v-if="!isMobile">
      <div class="gallery-container">
        <!-- 左侧图片展示区 -->
        <div class="gallery-main">
          <img :src="currentImage.url" :alt="currentImage.title" class="main-image" @click="showFullscreen = true">
          <div class="gallery-controls">
            <button @click="prevImage">上一张</button>
            <button @click="nextImage">下一张</button>
          </div>
        </div>

        <!-- 右侧文字信息 -->
        <div class="gallery-info">
          <h2>{{ currentImage.title }}</h2>
          <p class="date">{{ currentImage.date }}</p>
          <p class="description">{{ currentImage.description }}</p>
        </div>
      </div>

      <!-- 底部缩略图滑动区 -->
      <div class="thumbnail-container">
        <div class="thumbnails" ref="thumbnails">
          <div v-for="(img, index) in galleryImages" :key="index" class="thumbnail"
            :class="{ active: currentIndex === index }" @click="selectImage(index)">
            <img :src="img.thumbnail" :alt="img.title">
          </div>
        </div>
      </div>

      <!-- 全屏查看模态框 -->
      <div class="fullscreen-modal" v-if="showFullscreen" @click="showFullscreen = false">
        <img :src="currentImage.url" :alt="currentImage.title">
        <button class="close-btn" @click.stop="showFullscreen = false">×</button>
      </div>
    </div>

    <!-- 移动端画廊 - 使用 Element Plus 轮播组件 -->
    <div class="mobile-gallery" v-if="isMobile">
      <div class="section-title">随记</div>
      <el-carousel :interval="4000" height="300px" indicator-position="inside" arrow="always">
        <el-carousel-item v-for="(img, index) in galleryImages" :key="index">
          <div class="carousel-item" @click="showFullscreen(img.url)">
            <img :src="img.url" :alt="img.title" class="gallery-image">
            <!-- <div class="image-info">
              <h3>{{ img.title }}</h3>
              <p>{{ img.date }}</p>
            </div> -->
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>


    <!-- 留言墙 卡片形式 -->
    <div v-if="!isMobile" class="comments-section">
      <h2 class="section-title">留言墙</h2>
      <div class="comment-cards">
        <div v-for="(comment, index) in comments" :key="index" class="comment-card"
          :style="{ backgroundColor: getRandomColor() }">
          <div class="comment-header">
            <span class="username">{{ comment.username }}</span>
            <span class="timestamp">{{ comment.timestamp }}</span>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
          <div class="comment-footer">
            <span class="word-count">{{ comment.content.length }}/100</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端展示 -->
    <!-- 修改移动端留言墙部分 -->
    <div v-else class="comment-cards-mobile">
      <!-- 使用slice截取前3条评论 -->
      <div class="comment-subtitle">热门文章</div>
      <div v-for="(comment, index) in comments.slice(0, 3)" :key="index" class="comment-card"
        :style="{ backgroundColor: getRandomColor() }">
        <div class="comment-content">{{ comment.content }}</div>
      </div>

      <!-- 添加查看更多按钮 -->
      <el-button class="view-more-btn" @click="showAllComments = !showAllComments">
        {{ showAllComments ? '收起' : '查看更多' }}
      </el-button>

      <!-- 当点击查看更多时显示全部 -->
      <div v-if="showAllComments">
        <div v-for="(comment, index) in comments.slice(3)" :key="index + 3" class="comment-card"
          :style="{ backgroundColor: getRandomColor() }">
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
    </div>

    <!-- 联系我 -->
    <div v-if="!isMobile" class="contact-section">
      <div class="contact-container">
        <h2 class="section-title">联系我</h2>
        <div class="contact-content">
          <div class="contact-info">
            <div class="contact-item">
              <i class="el-icon-message-solid contact-icon"></i>
              <div class="contact-detail">
                <h4>邮箱联系</h4>
                <p>1666955239@qq.com</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="el-icon-phone-outline contact-icon"></i>
              <div class="contact-detail">
                <h4>电话咨询</h4>
                <p>+86 192-xxxx-8283</p>
              </div>
            </div>
            <div class="contact-item">
              <i class="el-icon-location-outline contact-icon"></i>
              <div class="contact-detail">
                <h4>办公地址</h4>
                <p>厦门理工学院集美校区</p>
              </div>
            </div>
          </div>

          <form class="contact-form" @submit.prevent="submitForm">
            <div class="form-group">
              <el-input v-model="username" style="width: 240px" placeholder="姓名" />
            </div>
            <div class="form-group">
              <el-input v-model="email" style="width: 240px" placeholder="邮箱" />
            </div>
            <div class="form-group">
              <el-input v-model="textarea" maxlength="100" style="width: 240px" placeholder="留言内容" show-word-limit
                type="textarea" />
            </div>
            <button type="submit" class="submit-btn">发送消息</button>
          </form>
        </div>
      </div>
    </div>

    <div v-else class="contact-section-mobile">
      <div class="contact-container-mobile">
        <h2 class="section-title-mobile">联系我</h2>

        <!-- 联系方式卡片 -->
        <!-- <div class="contact-cards-mobile">
          <div class="contact-card-mobile" v-for="(item, index) in contactItems" :key="index">
            <i :class="item.icon" class="contact-icon-mobile"></i>
            <div class="contact-info-mobile">
              <h4>{{ item.title }}</h4>
              <p>{{ item.content }}</p>
            </div>
          </div>
        </div> -->

        <!-- 表单区域 -->
        <form class="contact-form-mobile" @submit.prevent="submitForm">
          <div class="form-group-mobile">
            <el-input v-model="username" placeholder="姓名" />
          </div>
          <div class="form-group-mobile">
            <el-input v-model="email" placeholder="邮箱" />
          </div>
          <div class="form-group-mobile">
            <el-input v-model="textarea" placeholder="留言内容" type="textarea" maxlength="100" show-word-limit :rows="3" />
          </div>
          <!-- <button type="submit" class="submit-btn-mobile">发送消息</button> -->
          <el-button type="success" round class="submit-btn-mobile">发送</el-button>
        </form>
      </div>
    </div>

    <!-- 页脚 -->
    <footer class="footer">
      <p>© 2025 TechBlog. All rights reserved.</p>
      <div class="social-links">
        <a href="#">GitHub (To Be Releasesd)</a>
        <!-- <a href="#">Twitter</a>
        <a href="#">LinkedIn</a> -->
      </div>
    </footer>
  </div>
</template>

<script setup>
import { API_BASE_URL, IMAGE_BASE_URL } from '@/config'

import { ElMessage, ElCarousel, ElCarouselItem } from 'element-plus'
import NavBar from '../components/NavBar.vue'
import { useMediaQuery } from '@vueuse/core'
import { ref, onMounted, computed } from 'vue'
const navbar = ref(null)
const isTransparent = ref(true) // 初始状态为透明
const visitorCount = ref(0)
const likeCount = ref(0)
const activeIndex = ref('1')
const textarea = ref('')
const username = ref('')
const email = ref('')
const isMobile = useMediaQuery('(max-width: 768px)')
// 在script setup中添加状态控制
const showAllComments = ref(false);
// const checkMobile = () => {
//   isMobile.value = window.innerWidth <= 768
// }



const handleSelect = (key, keyPath) => {
  console.log(key, keyPath)
}

const carouselImages = ref([
  `${IMAGE_BASE_URL}/index/carousel/2.webp`,
  `${IMAGE_BASE_URL}/index/carousel/1.webp`
])

const galleryBackgroundStyle = computed(() => ({
  '--current-image-url': `url(${currentImage.value.url})`
}));

const posts = ref([
  {
    id: '1',
    title: 'Vite+Vue的学习路线',
    excerpt: '全面规划学习路径，从基础到高级，逐步深入。',
    image: `${IMAGE_BASE_URL}/index/index-article/ij.webp`,
  },
  {
    id: '2',
    title: 'intellij的maven报错',
    excerpt: '详细解决maven配置问题，确保项目正常运行。',
    image: `${IMAGE_BASE_URL}/index/index-article/vuevite.webp`,
  },
  {
    id: '3',
    title: '交通预测+深度学习',
    excerpt: '分享交通预测项目的实战经验，深入了解深度学习技术。',
    image: `${IMAGE_BASE_URL}/index/index-article/pdformer.webp`,
  }
])


const comments = ref([
  {
    username: '用户1',
    timestamp: '2023-10-15 14:30',
    content: '这个网站设计得很棒！'
  },
  {
    username: '用户2',
    timestamp: '2023-10-16 09:15',
    content: '我喜欢这个配色方案，非常现代'
  },
  {
    username: '用户3',
    timestamp: '2023-10-17 16:45',
    content: '内容很有价值，期待更多更新'
  },
  {
    username: '用户4',
    timestamp: '2023-10-17 16:45',
    content: '内容很有价值，期待更多更新'
  },
  {
    username: '用户1',
    timestamp: '2023-10-15 14:30',
    content: '这个网站设计得很棒！'
  },
  {
    username: '用户2',
    timestamp: '2023-10-16 09:15',
    content: '我喜欢这个配色方案，非常现代'
  },
  {
    username: '用户3',
    timestamp: '2023-10-17 16:45',
    content: '内容很有价值，期待更多更新'
  },
  {
    username: '用户4',
    timestamp: '2023-10-17 16:45',
    content: '内容很有价值，期待更多更新'
  }
]);

const getRandomColor = () => {
  const colors = [
    'rgba(255, 227, 227, 0.9)',
    'rgba(227, 255, 227, 0.9)',
    'rgba(227, 227, 255, 0.9)',
    'rgba(255, 255, 227, 0.9)',
    'rgba(227, 255, 255, 0.9)',
    'rgba(255, 227, 255, 0.9)'
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};


const scrollToContent = () => {
  const navbar = document.querySelector('.navbar') // 根据您的NavBar实际class选择
  const navbarHeight = navbar ? navbar.offsetHeight : 60 // 动态获取或使用默认值

  if (isMobile.value) {
    const target = document.querySelector('.mobile-post-list')
    if (target) {
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset
      window.scrollTo({
        top: targetPosition - navbarHeight,
        behavior: 'smooth'
      })
    }
  } else {
    const target = document.getElementById('content-section')
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }
  }
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
    //   item.style.setProperty('color', '#000000', 'important')
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
    //   item.style.setProperty('color', '#ffffff', 'important')
    // })

    navbarElement.style.position = 'absolute'
    navbarElement.style.top = '0'
  }
}

onMounted(() => {
  // checkMobile()
  // window.addEventListener('resize', checkMobile)
  window.addEventListener('scroll', handleScroll)
  // 模拟异步获取访问人数
  setTimeout(() => {
    visitorCount.value = 19230 // 示例数据
  }, 1000)
})


// ... existing script setup code ...

const galleryImages = ref([
  {
    url: `${IMAGE_BASE_URL}/gallery/1.webp`,
    thumbnail: `${IMAGE_BASE_URL}/gallery/thumb1.webp`,
    title: '城市夜景',
    date: '2023-05-15',
    description: '拍摄于城市中心的夜晚，灯光璀璨'
  },
  {
    url: `${IMAGE_BASE_URL}/gallery/2.webp`,
    thumbnail: `${IMAGE_BASE_URL}/gallery/thumb2.webp`,
    title: '自然风光',
    date: '2023-06-20',
    description: '山间清晨的薄雾与阳光'
  },
  {
    url: `${IMAGE_BASE_URL}/gallery/3.webp`,
    thumbnail: `${IMAGE_BASE_URL}/gallery/thumb3.webp`,
    title: '自然风光',
    date: '2023-06-20',
    description: '山间清晨的薄雾与阳光'
  },
  {
    url: `${IMAGE_BASE_URL}/gallery/4.webp`,
    thumbnail: `${IMAGE_BASE_URL}/gallery/thumb4.webp`,
    title: '自然风光',
    date: '2023-06-20',
    description: '山间清晨的薄雾与阳光'
  },
  {
    url: `${IMAGE_BASE_URL}/gallery/5.webp`,
    thumbnail: `${IMAGE_BASE_URL}/gallery/thumb5.webp`,
    title: '自然风光',
    date: '2023-06-20',
    description: '山间清晨的薄雾与阳光'
  },
  // 可以添加更多图片
]);

const currentIndex = ref(0);
const showFullscreen = ref(false);
const thumbnails = ref(null);

const currentImage = computed(() => galleryImages.value[currentIndex.value]);

const nextImage = () => {
  currentIndex.value = (currentIndex.value + 1) % galleryImages.value.length;
};

const prevImage = () => {
  currentIndex.value = (currentIndex.value - 1 + galleryImages.value.length) % galleryImages.value.length;
};

const selectImage = (index) => {
  currentIndex.value = index;
};

const submitForm = () => {
  // 获取输入值
  const name = username.value.trim();
  const userEmail = email.value.trim(); // 注意这里改成了 userEmail
  const message = textarea.value.trim();

  // 验证逻辑
  if (!name) {
    ElMessage({
      message: '姓名不能为空',
      type: 'warning'
    });
    return;
  }

  if (!userEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) { // 邮箱格式正则校验
    ElMessage({
      message: '请输入有效的邮箱地址',
      type: 'warning'
    });
    return;
  }

  if (!message || message.length > 100) { // 与评论区字数限制保持一致
    ElMessage({
      message: '留言内容需为1-100个字符',
      type: 'warning'
    });
    return;
  }

  // 验证通过后的逻辑
  ElMessage({
    message: '留言已提交，感谢您的参与！',
    type: 'success'
  });

  // 清空表单（可选）
  // nameInput.value.value = '';
  // emailInput.value.value = '';
  // messageInput.value.value = '';
};

// ... existing script setup code ...
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap');

.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  background: linear-gradient(135deg, #1e3c72, #2a5298);
  color: #ffffff;
  padding: 0;
}

/* 页头 */
.header {
  text-align: center;
  padding: 2rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.subtitle {
  font-size: 1rem;
  color: #cccccc;
  justify-self: left;
}

.nav-links {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.nav-item {
  color: #000000;
  text-decoration: none;
  padding: 0.3rem 0.8rem;
  border-radius: 5px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
}

.nav-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 页脚 */
.footer {
  background: #1a1a1a;
  padding: 1.5rem;
  text-align: center;
  color: #888888;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.social-links a {
  color: #888888;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #00d4ff;
}

/* 响应式设计 */

@media (max-width: 1024px) {
  .post-image {
    height: 180px;
  }
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: row;
    gap: 0.5rem;
    justify-content: space-around;
  }

  .post-image {
    height: 160px;
  }

  .post-info {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .nav-item {
    padding: 0.2rem 0.6rem;
    font-size: 0.9rem;
  }

  .content {
    grid-template-columns: 1fr;
    padding: 1rem 0.5rem;
  }

  .post-image {
    height: 140px;
  }
}
</style>

<style scoped>
/* 新增英雄区域样式 */
.hero-image {
  position: relative;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
}

/* .hero-text {
  padding: 2rem;
  border-radius: 10px;
} */

.hero-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 1;
}

.hero-title {
  font-family: 'Arial Black', sans-serif;
  font-size: 4rem;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  margin: 0;
  animation: fadeIn 2s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 调整原有容器样式 */
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  font-family: 'Inter', sans-serif;
  color: #ffffff;
  padding: 0;
  background: none;
  position: relative;
  /* 移除原有背景 */
}

.hero-wrapper {
  position: relative;
  width: 100%;
}

/* 修改 Element Menu 的样式 */
.el-menu-demo.navbar {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  background-color: transparent !important;
  padding: 0.5rem 1rem;
  transition: background-color 0.3s ease,
    color 0.3s ease,
    backdrop-filter 0.3s ease;
  backdrop-filter: blur(0px);
  -webkit-backdrop-filter: blur(0px);
  border-bottom: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 菜单项样式 */
.el-menu--horizontal.el-menu-demo.navbar>.el-menu-item {
  /* color: rgb(156, 156, 156) !important; */
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

/* 搜索框样式调整 */
.el-menu--horizontal.el-menu-demo.navbar .search-box {
  margin-left: auto;
  display: flex;
}

/* 保持原有滚动效果 */
.el-menu-demo.navbar.transparent {
  background-color: transparent !important;
  backdrop-filter: blur(0px) !important;
  border-bottom: none !important;
}

/* 内容区域 */
.content {
  flex: 1;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 2rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

/* 页脚 */
.footer {
  background: #1a1a1a;
  padding: 1.5rem;
  text-align: center;
  color: #888888;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.social-links a {
  color: #888888;
  text-decoration: none;
  margin: 0 0.5rem;
  transition: color 0.3s ease;
}

.social-links a:hover {
  color: #00d4ff;
}

/* 响应式设计 */

@media (max-width: 1024px) {
  .post-image {
    height: 180px;
  }
}

@media (max-width: 768px) {
  .nav-links {
    flex-direction: row;
    gap: 0.5rem;
    justify-content: space-around;
  }

  .post-image {
    height: 160px;
  }

  .post-info {
    padding: 1rem;
  }
}

@media (max-width: 480px) {
  .header h1 {
    font-size: 1.5rem;
  }

  .nav-item {
    padding: 0.2rem 0.6rem;
    font-size: 0.9rem;
  }

  .content {
    grid-template-columns: 1fr;
    padding: 1rem 0.5rem;
  }

  .post-image {
    height: 140px;
  }
}

/* 响应式调整 */
@media (max-width: 768px) {
  .hero-title {
    font-size: 3rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }
}

/* 导航栏样式调整 */
.nav-links {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  padding: 0.5rem 1rem;
}

.search-box {
  display: flex;
  margin-left: 1rem;
}

.search-box input {
  padding: 0.5rem;
  border: 1px solid #444;
  border-radius: 4px 0 0 4px;
  /* 背景透明  */
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

/* 响应式调整 */
@media (max-width: 768px) {
  .nav-links {
    flex-direction: column;
    gap: 0.5rem;
  }

  .search-box {
    margin: 0.5rem 0 0 0;
    width: 100%;
  }

  .search-box input {
    width: 100%;
  }
}
</style>

<style scoped>
.next-button {
  position: absolute;
  left: 50%;
  bottom: -270%;
  transform: translateX(-50%);
  background: transparent;
  color: white;
  border: 1px solid rgba(255, 255, 255, 0.5);
  padding: 8px 24px;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.next-button:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: white;
}

.content-section {
  display: grid;
  padding: 0rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, minmax(280px, 1fr));
  gap: 2rem;
  background-color: transparent;
  min-height: 100vh;
  /* 添加此行：保证该区域至少占满一屏 */
  scroll-margin-top: 80px;
  /* 可选：防止导航栏遮挡内容 */
}

@media (max-width: 768px) {
  .content-section {
    grid-template-columns: 1fr;
  }
}

.subtitle {
  font-size: 1.8rem;
  color: transparent;
  background: linear-gradient(90deg, #100f0d, #2d1820, #0c2d34);
  background-clip: text;
  text-align: center;
  margin: 1rem 1rem;
  grid-column: 1 / -1;
  /* 关键：让标题横跨整个网格 */
  justify-self: left;
  /* 可选：确保文字居中对齐 */
}

/* 博客卡片样式 */
.post-card {
  background-color: white;
  /* 更深的半透明背景 */
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  backdrop-filter: blur(5px);
  /* 可适当降低模糊值 */
  height: 25rem;
}


@media (max-width: 768px) {
  .post-card {
    height: auto;
  }

  .post-image {
    height: 180px;
  }

  .post-info {
    padding: 1rem;
  }
}


.post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
}


.post-image {
  height: 220px;
  background-size: cover;
  background-position: center;
}

/* 博客信息部分 */
.post-info {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.post-title {
  font-size: 1.5rem;
  color: #100f0f;
  /* 白色标题 */
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.post-excerpt {
  font-size: 0.95rem;
  color: #1c1a1a;
  /* 稍暗的浅灰色文字 */
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

.demonstration {
  color: var(--el-text-color-secondary);
}

.swipper-wrapper {
  grid-column: span 2;
  /* 占据两列 */
  margin-bottom: 2rem;
}

.swipper {
  width: 100%;
  max-width: 100%;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 1rem 0;
}

.swipper-el-carousel {
  border-radius: 10px !important;
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.right-card {
  background: linear-gradient(135deg,
      rgba(255, 0, 0, 0.3),
      rgba(255, 165, 0, 0.3),
      rgba(255, 255, 0, 0.3),
      rgba(0, 128, 0, 0.3),
      rgba(0, 0, 255, 0.3),
      rgba(75, 0, 130, 0.3),
      rgba(238, 130, 238, 0.3));
  border-radius: 10px;
  padding: 1.5rem;
  color: white;
  height: 300px;
  backdrop-filter: blur(5px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  position: relative;
  overflow: hidden;
  margin: 1rem 0;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

@keyframes gradientMoveReverse {
  0% {
    transform: rotate(-15deg) translateX(50%);
  }

  100% {
    transform: rotate(-15deg) translateX(-50%);
  }
}

.right-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
}

.right-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: #000000;
}

.right-card h2 {
  font-size: 1.5rem;
  margin: 1.5rem 0 0.5rem;
  color: #000000;
}

.right-card p {
  font-size: 1.8rem;
  font-weight: bold;
  color: #c39b7b;
  margin: 0;
}

.right-card-top {
  grid-column: 3 / 4;
  grid-row: auto;
}

@media (max-width: 768px) {
  .el-menu--horizontal.el-menu-demo.navbar {
    flex-direction: column;
    height: auto;
    padding: 0.5rem;
  }

  .el-menu--horizontal.el-menu-demo.navbar>.el-menu-item {
    margin: 0.2rem 0 !important;
    width: 100%;
    text-align: center;
  }

  .el-menu-demo.navbar .search-box {
    margin: 0.5rem auto !important;
    width: 90%;
  }
}

.carousel-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 除了 cover 外，还可以使用 contain */

  /* 确保图片覆盖整个区域 */
  border-radius: 10px;
  /* 可选：添加圆角 */
}

/* 图集样式 */
/* .gallery {
  background: rgba(0, 0, 0, 0.7);
  padding: 2rem;
  margin-top: 2rem;
  border-radius: 10px;
  backdrop-filter: blur(5px);
} */

.gallery {
  padding: 2rem 1rem;
  margin: 2rem auto 0;
  border-radius: 10px;
  max-width: 1200px;
  width: 100%;
  /* 移除背景色和模糊效果 */
  background: rgba(0, 0, 0, 0.1);
  backdrop-filter: none;
}

.gallery-container {
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
}

.gallery-main {
  flex: 2;
  position: relative;
}

.main-image {
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  cursor: zoom-in;
  transition: transform 0.3s;
}

.main-image:hover {
  transform: scale(1.02);
}

.gallery-info {
  flex: 1;
  color: rgb(0, 0, 0);
}

.gallery-info h2 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.gallery-info .date {
  color: #686868;
  margin-bottom: 1rem;
}

.gallery-info .description {
  line-height: 1.6;
}

.gallery {
  position: relative;
  /* 为伪元素定位 */
  overflow: hidden;
  /* 防止背景溢出 */
  padding: 2rem 1rem;
  /* 根据实际布局调整内边距 */
}

.gallery::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: var(--current-image-url);
  /* 使用动态传递的图片URL */
  background-size: cover;
  background-position: center;
  filter: blur(10px);
  /* 调整模糊程度（数值越大越模糊） */
  opacity: 0.3;
  /* 调整背景透明度（0-1之间） */
  z-index: -1;
  /* 确保背景在内容下方 */
}

/* 确保子内容区域不受模糊影响 */
.gallery-container {
  position: relative;
  z-index: 1;
  /* 内容层高于背景层 */
}

.thumbnail-container {
  overflow-x: auto;
  padding: 1rem 0;
}

.thumbnails {
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
}

.thumbnail {
  width: 100px;
  height: 70px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  opacity: 0.7;
  transition: all 0.3s;
}

.thumbnail:hover,
.thumbnail.active {
  opacity: 1;
  transform: scale(1.05);
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.fullscreen-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

.gallery-controls {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
}

.gallery-controls button {
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.3s;
}

.gallery-controls button:hover {
  background: rgba(255, 255, 255, 0.4);
}

/* 留言墙样式 */
.comments-section {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.section-title {
  font-size: 1.8rem;
  color: rgb(0, 0, 0);
  margin-bottom: 1.5rem;
  text-align: center;
}

.comment-cards {
  display: grid;
  grid-template-columns: repeat(4, minmax(280px, 1fr));
  gap: 1.5rem;
}

.comment-card {
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transform: rotate(-1deg);
  transition: all 0.3s ease;
  position: relative;
}

.comment-card:nth-child(even) {
  transform: rotate(1deg);
}

.comment-card:hover {
  transform: rotate(0deg) scale(1.03);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  font-size: 0.9rem;
}

.username {
  font-weight: bold;
}

.timestamp {
  color: #666;
}

.comment-content {
  margin-bottom: 1rem;
  line-height: 1.5;
}

.comment-footer {
  text-align: right;
  font-size: 0.8rem;
  color: #666;
}

.username {
  font-weight: bold;
  color: #101010;
}

.comment-content {
  color: #666;
}

.contact-section {
  padding: 4rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}

.contact-container {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 2.5rem;
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
}

.section-title {
  font-size: 2rem;
  color: #000000;
  text-align: center;
  margin-bottom: 2.5rem;
  background: linear-gradient(90deg, #00d4ff, #7a00ff);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2.5rem;
}

.contact-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-item {
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.08);
  border-radius: 10px;
  transition: transform 0.3s ease;
}

.contact-item:hover {
  transform: translateX(8px);
}

.contact-icon {
  font-size: 2rem;
  color: #00d4ff;
}

.contact-detail h4 {
  font-size: 1.1rem;
  color: #252222;
  margin-bottom: 0.5rem;
}

.contact-detail p {
  font-size: 0.95rem;
  color: #121010;
  margin: 0;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 0.8rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 6px;
  color: #5b5656;
  font-size: 0.95rem;
  transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group textarea:focus {
  outline: none;
  border-color: #24242e;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.submit-btn {
  padding: 0.8rem 1rem;
  background: linear-gradient(90deg, #00d4ff, #7a00ff);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.3s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
  }

  .contact-container {
    padding: 1.5rem;
  }

  .section-title {
    font-size: 1.6rem;
  }
}

@media (max-width: 768px) {

  .contact-form .form-group input,
  .contact-form .form-group textarea {
    width: 100%;
    font-size: 1rem;
    padding: 0.6rem 0.8rem;
  }

  .submit-btn {
    font-size: 1rem;
  }
}

.fullscreen-modal img {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* 移动端文章列表样式 */
.mobile-post-list {
  padding: 0 1rem;
  margin-top: 0;
}

.mobile-post-list .subtitle {
  /* font-size: 1.8rem;
  font-weight: 500; */
  /* color: #333; */
  /* margin-bottom: 1rem; */
  /* padding-left: 0.5rem; */
  /* border-left: 4px solid #00d4ff; */
  /* margin: 0 auto; */
  margin: 0 auto;
  text-align: left;
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
}

.post-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.post-item {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.8rem;
  color: #666;
}

.post-title {
  font-size: 1.1rem;
  color: #333;
  margin: 0.5rem 0;
  line-height: 1.4;
  font-weight: 600;
}

.mobile-post-list .post-excerpt {
  font-size: 1rem;
  color: #383838;
  margin: 0.5rem 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-footer {
  display: flex;
  justify-content: space-between;
  margin-top: 0.8rem;
  font-size: 0.8rem;
}

.read-more {
  color: #f59595;
}

.comment-count {
  color: #6c6a6a;
}

/* 动画效果 */
.post-item {
  transition: all 0.3s ease;
}

.post-item:active {
  background-color: #f5f5f5;
}

/* 响应式调整 */
@media (min-width: 769px) {
  .mobile-post-list {
    display: none;
  }
}

/* 移动端画廊样式 */
.mobile-gallery {
  padding: 1rem;
  margin: 2rem 0;
  /* background: rgba(0, 0, 0, 0.05); */
  border-radius: 12px;
  display: block;
}

.mobile-gallery .section-title {
  text-align: left;
  display: block;
  /* 确保标题是块级元素 */
  width: 100%;
  /* 占据全部宽度 */
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 1rem;
  background: none;
}

.carousel-item {
  height: 100%;
  position: relative;
  overflow: hidden;
  /* 防止图片超出容器 */
}

.gallery-image {
  width: 100%;
  height: 100%;
  /* 确保高度也填充容器 */
  object-fit: cover;
  object-position: center;
  /* 确保图片居中显示 */
}

/* 调整 Element Plus 轮播组件样式 */
:deep(.el-carousel) {
  border-radius: 8px;
}

:deep(.el-carousel__arrow) {
  background-color: rgba(255, 255, 255, 0.5);
  color: #333;
}

:deep(.el-carousel__indicators) {
  bottom: -25px;
}

:deep(.el-carousel__button) {
  background-color: #ccc;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

:deep(.el-carousel__indicator.is-active button) {
  background-color: #ffffff;
}

/* 响应式调整 */
@media (min-width: 769px) {
  .mobile-gallery {
    display: none;
  }
}

/* 新增的移动端专用样式 */
.comment-cards-mobile {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  /* padding: 0 0.5rem; */
  padding: 1rem;
}

.comment-cards-mobile .comment-card {
  padding: 1rem;
  border-radius: 12px;
  min-height: 80px;
  display: flex;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;
}

/* 便签撕边效果 */
.comment-cards-mobile .comment-card::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 20px;
  height: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 50%, transparent 50%);
}

.comment-cards-mobile .comment-content {
  font-size: 0.95rem;
  line-height: 1.4;
  color: #333;
  width: 100%;
  word-break: break-word;
}

/* 交互反馈 */
.comment-cards-mobile .comment-card:active {
  transform: scale(0.98);
}

/* 标题样式调整 */
.comments-section .section-title {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
  text-align: center;
  padding: 0 0.5rem;
}

.view-more-btn {
  width: 30% !important;
  margin: 1rem auto !important;
  /* 确保水平和垂直居中 */
  display: block !important;
}

.comment-subtitle {
  margin: 1rem 0 0.8rem;
  display: inline-block;
  position: relative;
  text-align: left;

  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
}

/* 移动端联系页样式 */
.contact-section-mobile {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.9);
  margin-top: 1rem;
}

.contact-container-mobile {
  max-width: 100%;
}

.section-title-mobile {
  /* font-size: 1.5rem;
  color: #333;
  text-align: center; */
  margin-bottom: 1.5rem;
  /* background: linear-gradient(90deg, #00d4ff, #7a00ff); */
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;

  text-align: left;
  font-size: 1.8rem;
  font-weight: 500;
  color: #333;
}

.contact-cards-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.contact-card-mobile {
  display: flex;
  align-items: center;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

/* .contact-icon-mobile {
  font-size: 1.8rem;
  color: #7a00ff;
  margin-right: 1rem;
  flex-shrink: 0;
} */

.contact-info-mobile h4 {
  font-size: 1rem;
  color: #333;
  margin-bottom: 0.3rem;
}

.contact-info-mobile p {
  font-size: 0.9rem;
  color: #666;
  margin: 0;
}

.contact-form-mobile {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group-mobile :deep(.el-input) {
  width: 100%;
}

.form-group-mobile :deep(.el-input__inner) {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #eee;
  color: #333;
}

.submit-btn-mobile {
  width: 30%;
  padding: 0.8rem;
  margin: 1rem auto;
  /* background: linear-gradient(90deg, #00d4ff, #7a00ff);
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer; */
  transition: transform 0.2s;
}

.submit-btn-mobile:active {
  transform: scale(0.98);
}
</style>