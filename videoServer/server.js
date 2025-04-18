const express = require('express');
const puppeteer = require('puppeteer');
const bodyParser = require('body-parser');
const cors = require('cors');  // 导入cors库
const fs = require('fs');
const { exec } = require('child_process');

const app = express();
// 使用body-parser解析JSON请求体
app.use(bodyParser.json());
// 配置CORS中间件
app.use(cors())
// 生产环境中需修改，限制允许的源以提高安全性
// app.use(cors({
//     origin: 'http://localhost:3000',  // 允许来自http://localhost:3000的请求
//     credentials: true  // 允许cookies
// }));

// 保存录制数据的会话变量，给定初始值
let recordSession = {
    finalSpec: {
        "test": "test"
    },
    scriptList: [
        "test"
    ],
    cardListSpec: [["test"]],
    duration: 5
};

app.use(express.json());  // 为了解析JSON请求体
app.use('/videos', express.static(__dirname + '/videos'));

// app.post('/recordVideo', async (req, res) => {
//     const { finalSpec, scriptList } = req.body;
//     console.log('RecordService finalSpec:', finalSpec);
//     console.log('RecordService scriptList:', scriptList);
//     // ... 其他录制逻辑 ...
// });

app.post('/recordVideo', async (req, res) => {
    const {  animationFactList,
        infoTitle,
        keyPoint,
        captionList,genre,template,duration } = req.body;
    console.log('req:', req.body);

    // 存储finalSpec和scriptList到会话变量中
    recordSession = { animationFactList,
        infoTitle,
        keyPoint,
        captionList,genre,template };
    // 假设这是从前端获取的信息
    const frontendData = {
        animationFactList: animationFactList,
        infoTitle:infoTitle,
        keyPoint:keyPoint,
        captionList:captionList,
        genre:genre,
        template:template
    };
    //console.log('frontendData',frontendData)
    const queryParams = new URLSearchParams(frontendData).toString();

    const browser = await puppeteer.launch({
        // headless: "new",  // 使用新的无头模式
        // executablePath: puppeteer.executablePath(),
        // headless: false,
        executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    });
    const page = await browser.newPage();
    
    //await page.goto('http://localhost:3000/record');
    await page.goto('http://localhost:3000/record', { waitUntil: 'domcontentloaded' });
    await page.setViewport({ width: 800, height: 500 });  // 设置视口大小
  
    await page.waitForSelector('#recordpage-content-div');  // 等待记录区域渲染完成
    //await page.waitForTimeout(5000); // 等待5秒钟

  
    const frameRate = 20;  // 帧率
    //const duration = 5;  // 录制时长，单位：秒
    //const totalFrames = frameRate * duration;
    const totalFrames = 100
    // for (let i = 0; i < totalFrames; i++) {
    //   const frameFile = `frames/frame${i}.png`;
    //   await page.screenshot({ path: frameFile });
    //   await page.waitForTimeout(1000 / frameRate);  // 等待下一帧
    // }
    // Example using requestAnimationFrame
    console.log('totalFrames',totalFrames)
    for (let i = 0; i < totalFrames; i++) {
        const frameFile = `frames/frame${i}.png`;
        // console.log(frameFile)
        await page.evaluate(() => new Promise(resolve => requestAnimationFrame(resolve)));
        await page.screenshot({ path: frameFile });
    }
  
    await browser.close();
    
    // 使用ffmpeg合成视频
    exec('ffmpeg -r 20 -i frames/frame%d.png -c:v libx264 -vf "fps=20,format=yuv420p" videos/output.mp4', (err, stdout, stderr) => {
      if (err) {
        console.error('Error creating video: ', stderr);
        res.status(500).send('Error creating video');
      } else {
        console.log('Video created: ', stdout);
        res.send({ downloadUrl: 'http://localhost:8000/videos/output.mp4' });
      }
    });
  });

app.get('/getRecordData', (req, res) => {
    if (recordSession.animationFactList && recordSession.captionList) {
        console.log("recordSession:", recordSession)
        res.json(recordSession);
    } else {
        res.status(404).send('No record data found');
    }
});

app.listen(8000, () => {
    console.log('RecordService is running on port 8000');
});