// myserver.js
const express = require('express');
const path = require('path');
const fs = require('fs'); // 新增文件系统模块
const app = express();
const PORT = 3000;

// 更通用的图片处理路由
app.get('/api/images/:filename', (req, res) => {
    const filename = req.params.filename;
    const imagePath = path.join(__dirname, 'images', filename);
    
    // 检查文件是否存在
    if (!fs.existsSync(imagePath)) {
        return res.status(404).send('Image not found');
    }

    // 检查文件扩展名是否合法
    const validExtensions = ['.png', '.jpg', '.jpeg', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    if (!validExtensions.includes(ext)) {
        return res.status(400).send('Invalid image format');
    }

    res.sendFile(imagePath);
});

// 启动服务器
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});