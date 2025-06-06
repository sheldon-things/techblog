<template>
  <div class="container">
    <NavBar ref="navbar" />
    <div class="gallery-container">
      <h2>我的图片画廊</h2>
      <div class="image-grid">
        <div v-for="(image, index) in images" :key="index" class="grid-item" @click="showImageDetails(image)">
          <img :src="image.src" :alt="image.alt" />
        </div>
      </div>

      <!-- 图片详情弹窗 -->
      <div v-if="selectedImage" class="modal" @click.self="closeModal">
        <div class="modal-content">
          <img :src="selectedImage.src" :alt="selectedImage.alt" />
          <p>{{ selectedImage.alt }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import NavBar from '../components/NavBar.vue'
import { ref, onMounted } from 'vue'

const navbar = ref(null)

const images = [
  {
    src: '/static/gallery/1.jpg',
    alt: '风景 1'
  },
  {
    src: '/static/gallery/2.jpg',
    alt: '风景 2'
  },
  {
    src: '/static/gallery/3.jpg',
    alt: '风景 3'
  },
  {
    src: '/static/gallery/4.jpg',
    alt: '风景 4'
  },
  {
    src: '/static/gallery/5.jpg',
    alt: '风景 5'
  }
];

const selectedImage = ref(null);

const showImageDetails = (image) => {
  selectedImage.value = image;
};

const closeModal = () => {
  selectedImage.value = null;
};
</script>

<style scoped>
.container {
  background-color: rgba(44, 41, 41, 0.2);
  width: 100%;
  padding-top: 60px;
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
}

.gallery-container {
  padding: 20px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 15px;
  margin-top: 20px;
}

.grid-item {
  width: 250px;
  height: 250px;
  overflow: hidden;
  border-radius: 8px;
  transition: transform 0.2s ease;
  cursor: pointer;
  position: relative;
}

.grid-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /* 保持比例并裁剪 */
}

.grid-item:hover {
  transform: scale(1.05);
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  max-width: 90vw;
  /* 使用视口单位适应不同屏幕 */
  max-height: 80vh;
  overflow: auto;
  /* 防止内容过大 */
  text-align: center;
}

.modal-content img {
  max-width: 90vw;
  /* 图片最大不超过屏幕宽度 */
  max-height: 70vh;
  /* 图片最大不超过屏幕高度 */
  width: auto;
  height: auto;
  object-fit: contain;
  /* 完整显示图片，不裁剪 */
  border-radius: 8px;
}
</style>