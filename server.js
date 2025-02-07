<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Memo - 快速记录你的想法</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
            background: linear-gradient(120deg, #fdfbfb 0%, #ebedee 100%);
            min-height: 100vh;
            padding: 40px 20px;
            color: #2c3e50;
        }

        .container {
            max-width: 720px;
            margin: 0 auto;
        }

        .header {
            text-align: center;
            margin-bottom: 40px;
            animation: fadeIn 0.8s ease;
        }

        .header h1 {
            font-size: 2.8em;
            color: #2c3e50;
            margin-bottom: 16px;
            letter-spacing: -0.5px;
            font-weight: 700;
        }

        .header .tagline {
            font-size: 1.4em;
            color: #34495e;
            margin-bottom: 8px;
            font-weight: 500;
            line-height: 1.4;
        }

        .header .sub-tagline {
            color: #7f8c8d;
            font-size: 1.1em;
        }

        .input-box {
            background: white;
            padding: 35px;
            border-radius: 24px;
            box-shadow: 0 10px 40px rgba(0, 0, 0, 0.08);
            margin-bottom: 40px;
            transition: all 0.3s ease;
            animation: slideUp 0.5s ease;
        }

        .input-box:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 50px rgba(0, 0, 0, 0.12);
        }

        textarea {
            width: 100%;
            height: 140px;
            padding: 20px;
            border: 2px solid #edf2f7;
            border-radius: 16px;
            font-size: 16px;
            resize: vertical;
            transition: all 0.3s ease;
            margin-bottom: 20px;
            color: #2c3e50;
            line-height: 1.6;
            background: #f8fafc;
        }

        textarea:focus {
            border-color: #4299e1;
            background: white;
            box-shadow: 0 0 0 4px rgba(66, 153, 225, 0.1);
            outline: none;
        }

        textarea::placeholder {
            color: #a0aec0;
        }

        .submit-btn {
            background: #4299e1;
            color: white;
            border: none;
            padding: 14px 28px;
            border-radius: 14px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 600;
        }

        .submit-btn:hover {
            background: #3182ce;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(66, 153, 225, 0.3);
        }

        .text-item {
            background: white;
            padding: 30px;
            border-radius: 24px;
            margin-bottom: 25px;
            box-shadow: 0 8px 30px rgba(0, 0, 0, 0.06);
            transition: all 0.3s ease;
            animation: fadeIn 0.5s ease;
        }

        .text-item:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.08);
        }

        .text-content {
            font-size: 16px;
            line-height: 1.7;
            margin-bottom: 20px;
            color: #2d3748;
        }

        .text-meta {
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #718096;
            font-size: 14px;
            padding-top: 15px;
            border-top: 1px solid #edf2f7;
        }

        .action-buttons {
            display: flex;
            gap: 12px;
        }

        .like-btn, .share-btn {
            padding: 8px 16px;
            border-radius: 12px;
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.2s ease;
            font-size: 14px;
            font-weight: 500;
        }

        .like-btn {
            background: #fef2f2;
            color: #e53e3e;
        }

        .share-btn {
            background: #ebf8ff;
            color: #3182ce;
        }

        .like-btn:hover, .share-btn:hover {
            transform: translateY(-2px);
            filter: brightness(0.95);
        }

        .toast {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            background-color: rgba(45, 55, 72, 0.95);
            color: white;
            padding: 16px 32px;
            border-radius: 16px;
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            z-index: 1000;
            font-size: 15px;
            font-weight: 500;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            text-align: center;
            min-width: 240px;
            pointer-events: none;
            backdrop-filter: blur(8px);
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @media (max-width: 600px) {
            body {
                padding: 20px 15px;
            }

            .header h1 {
                font-size: 2.2em;
            }

            .header .tagline {
                font-size: 1.2em;
            }

            .input-box, .text-item {
                padding: 20px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="header">
            <h1>My Memo 随手记录</h1>
            <p class="tagline">快速分享你的想法，随时记录灵感</p>
            <p class="sub-tagline">无需登录，立即发布</p>
        </header>

        <div class="input-box">
            <textarea id="textInput" placeholder="写下你的想法..."></textarea>
            <button onclick="publishText()" class="submit-btn">发布文本</button>
        </div>

        <div id="textsList"></div>
    </div>

    <div id="toast" class="toast"></div>

    <script>
        // 修改 displayTexts 函数，移除删除按钮
        function displayTexts() {
            const texts = JSON.parse(localStorage.getItem('texts') || '[]');
            const textsList = document.getElementById('textsList');
            
            textsList.innerHTML = texts.map((text, index) => `
                <div class="text-item" style="--index: ${index}" id="text-${text.id}">
                    <div class="text-content">${text.content}</div>
                    <div class="text-meta">
                        <span>发布时间：${text.date}</span>
                        <div class="action-buttons">
                            <button class="like-btn" onclick="likeText('${text.id}')">
                                <span>❤️</span> 
                                <span>${text.likes || 0}</span>
                            </button>
                            <button class="share-btn" onclick="copyShareLink('${text.id}')">
                                <span>🔗</span>
                                <span>分享</span>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        // 保持其他 JavaScript 函数不变
    </script>
</body>
</html>
