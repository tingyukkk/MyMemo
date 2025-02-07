const express = require('express');
const app = express();
const shortid = require('shortid');

app.use(express.json());

// 存储文本的简单数据库（实际应用中应该使用真实数据库）
const texts = new Map();

// 创建新文本
app.post('/api/texts', (req, res) => {
    const { content } = req.body;
    const urlHash = shortid.generate();
    
    texts.set(urlHash, {
        content,
        createdAt: new Date(),
        views: 0
    });

    res.json({ urlHash });
});

// 获取文本
app.get('/text/:urlHash', (req, res) => {
    const text = texts.get(req.params.urlHash);
    if (!text) {
        return res.status(404).send('文本不存在');
    }
    text.views++;
    res.send(`
        <h1>分享的文本</h1>
        <p>${text.content}</p>
        <p>浏览次数：${text.views}</p>
    `);
});

app.listen(3000, () => {
    console.log('服务器运行在 http://localhost:3000');
}); 