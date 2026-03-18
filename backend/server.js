import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { inngest, fuctions } from './inngest/index.js';


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
    functions: fuctions,
}));

const PORT = process.env.PORT || 5556;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
