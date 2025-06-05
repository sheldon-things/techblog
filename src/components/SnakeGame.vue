<template>
  <div class="snake-game">
    <div class="game-container">
      <canvas ref="gameCanvas" class="game-canvas"></canvas>
      <div class="game-controls">
        <div class="score">得分: {{ score }}</div>
        <button @click="startGame" v-if="!isPlaying">开始游戏</button>
        <button @click="pauseGame" v-else>暂停</button>
        <button @click="resetGame">重置</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const gameCanvas = ref(null);
const score = ref(0);
const isPlaying = ref(false);
let snake = [];
let food = {};
let direction = 'right';
let gameLoop = null;
const gridSize = 20;
const canvasSize = 400;

const startGame = () => {
  isPlaying.value = true;
  snake = [
    {x: 160, y: 200},
    {x: 140, y: 200},
    {x: 120, y: 200}
  ];
  generateFood();
  gameLoop = setInterval(gameUpdate, 100);
};

const pauseGame = () => {
  isPlaying.value = false;
  clearInterval(gameLoop);
};

const resetGame = () => {
  pauseGame();
  score.value = 0;
  drawGame();
};

const generateFood = () => {
  food = {
    x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
    y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
  };
  for (let segment of snake) {
    if (segment.x === food.x && segment.y === food.y) {
      return generateFood();
    }
  }
};

const gameUpdate = () => {
  const head = {x: snake[0].x, y: snake[0].y};
  
  switch(direction) {
    case 'up': head.y -= gridSize; break;
    case 'down': head.y += gridSize; break;
    case 'left': head.x -= gridSize; break;
    case 'right': head.x += gridSize; break;
  }
  
  if (
    head.x < 0 || head.x >= canvasSize || 
    head.y < 0 || head.y >= canvasSize ||
    snake.some(segment => segment.x === head.x && segment.y === head.y)
  ) {
    return gameOver();
  }
  
  snake.unshift(head);
  
  if (head.x === food.x && head.y === food.y) {
    score.value += 10;
    generateFood();
  } else {
    snake.pop();
  }
  
  drawGame();
};

const gameOver = () => {
  pauseGame();
  alert(`游戏结束! 最终得分: ${score.value}`);
};

const drawGame = () => {
  const ctx = gameCanvas.value.getContext('2d');
  ctx.fillStyle = '#2d1820';
  ctx.fillRect(0, 0, canvasSize, canvasSize);
  
  snake.forEach((segment, index) => {
    ctx.fillStyle = index === 0 ? '#00d4ff' : '#ffffff';
    ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
  });
  
  ctx.fillStyle = '#ff0000';
  ctx.fillRect(food.x, food.y, gridSize, gridSize);
};

const handleKeyDown = (e) => {
  if (!isPlaying.value) return;
  
  switch(e.key) {
    case 'ArrowUp': if (direction !== 'down') direction = 'up'; break;
    case 'ArrowDown': if (direction !== 'up') direction = 'down'; break;
    case 'ArrowLeft': if (direction !== 'right') direction = 'left'; break;
    case 'ArrowRight': if (direction !== 'left') direction = 'right'; break;
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
  gameCanvas.value.width = canvasSize;
  gameCanvas.value.height = canvasSize;
  drawGame();
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
  if (gameLoop) clearInterval(gameLoop);
});
</script>

<style scoped>
.snake-game {
  max-width: 1200px;
  margin: 2rem auto;
  padding: 1rem;
}

.game-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.game-canvas {
  border: 2px solid #00d4ff;
  border-radius: 8px;
  background-color: #2d1820;
}

.game-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.game-controls button {
  padding: 0.5rem 1rem;
  background: rgba(0, 212, 255, 0.2);
  border: 1px solid #00d4ff;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.game-controls button:hover {
  background: rgba(0, 212, 255, 0.4);
}

.score {
  font-size: 1.2rem;
  color: white;
  margin-right: 1rem;
}
</style>