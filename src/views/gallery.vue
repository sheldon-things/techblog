<template>
  <!-- 移动端专属容器 -->
  <div class="mobile-container" v-if="isMobile">
    <NavBar ref="navbar" />
    <div class="mobile-gallery">
      <h2>我的图片画廊</h2>
      <div class="mobile-grid">
        <div v-for="(image, index) in images" :key="index" class="mobile-item" @click="showMobileImage(image, index)">
          <img :src="image.src" :alt="image.alt" />
        </div>
      </div>

      <!-- 移动端图片详情 -->
      <div v-if="selectedMobileImage" class="mobile-modal" :class="{ 'active': isModalOpen }" @click="closeMobileModal">
        <div class="mobile-modal-content">
          <img :src="selectedMobileImage.src" :alt="selectedMobileImage.alt" />
          <p>{{ selectedMobileImage.alt }}</p>
        </div>
      </div>
    </div>
  </div>

  <div v-else class="container">
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
import { API_BASE_URL, IMAGE_BASE_URL } from '@/config'
import { useMediaQuery } from '@vueuse/core'

const isMobile = useMediaQuery('(max-width: 768px)')

const navbar = ref(null)

const images = [
  {
    src: `${IMAGE_BASE_URL}/gallery/1.webp`,
    alt: '风景 1'
  },
  {
    src: `${IMAGE_BASE_URL}/gallery/2.webp`,
    alt: '风景 2'
  },
  {
    src: `${IMAGE_BASE_URL}/gallery/3.webp`,
    alt: '风景 3'
  },
  {
    src: `${IMAGE_BASE_URL}/gallery/4.webp`,
    alt: '风景 4'
  },
  {
    src: `${IMAGE_BASE_URL}/gallery/5.webp`,
    alt: '风景 5'
  }
];

const selectedImage = ref(null);

const isModalOpen = ref(false);
const selectedMobileImage = ref(null);
const currentImageIndex = ref(0);

const showMobileImage = (image, index) => {
  selectedMobileImage.value = image;
  currentImageIndex.value = index;
  isModalOpen.value = true;
};

const closeMobileModal = () => {
  isModalOpen.value = false;
  setTimeout(() => {
    selectedMobileImage.value = null;
  }, 300); // 等待动画结束
};

const swipeLeft = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--;
    selectedMobileImage.value = images[currentImageIndex.value];
  }
};

const swipeRight = () => {
  if (currentImageIndex.value < images.length - 1) {
    currentImageIndex.value++;
    selectedMobileImage.value = images[currentImageIndex.value];
  }
};

const showImageDetails = (image) => {
  selectedImage.value = image;
};

const closeModal = () => {
  selectedImage.value = null;
};

</script>

<style scoped>
.container {
  background-color: white;
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

.mobile-container {
  padding-top: 60px;
  min-height: 100vh;
  background-color: white;
}

.mobile-gallery {
  padding: 15px;
}

.mobile-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 8px;
  margin-top: 15px;
}

.mobile-item {
  aspect-ratio: 1;
  overflow: hidden;
  border-radius: 4px;
}

.mobile-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;
}

.mobile-modal.active {
  opacity: 1;
}

.mobile-modal-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.mobile-modal-content img {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.mobile-modal-content p {
  color: white;
  margin-top: 15px;
  text-align: center;
}
</style>