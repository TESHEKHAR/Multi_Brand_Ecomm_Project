import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        credentials: true,
    })
)


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
console.log("EMAIL_USER:", process.env.EMAIL_USER); // DEBUG line
console.log("EMAIL_PASS:", process.env.EMAIL_PASS); // DEBUG line


app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
