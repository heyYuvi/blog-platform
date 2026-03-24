import express from 'express';
import mongoDB from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoute.js'
import { protect } from './middlewares/authMiddleware.js';

dotenv.config(); //reads .env file and attach variable to process.env.VARIABLE_NAME

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', protect, (req, res) => {
    res.json({
        message: "Your blog platform is running"
    });
});

app.use('/api/user', userRoutes);

app.use('/api', postRoutes);

app.use('/api', commentRoutes);

const startServer = async () => {
    try {
        await mongoDB();

        app.listen(PORT, () => {
            console.log(`Server is running on the PORT ${PORT}`);
        });
    } catch (error) {
        console.error(`Failed to start server ${error.message}`);
    }
}

startServer();