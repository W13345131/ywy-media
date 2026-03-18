import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { inngest, functions } from './inngest/index.js';
import { serve } from 'inngest/express';


dotenv.config();

connectDB();


const app = express();


app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Server is running');
});


app.use('/api/inngest', serve({
    client: inngest,
    functions: functions,
}));


// Vercel Serverless 需要导出 app，不能使用 app.listen
export default app;

// 本地开发时启动服务器
if (!process.env.VERCEL) {
    const PORT = process.env.PORT || 5556;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}
