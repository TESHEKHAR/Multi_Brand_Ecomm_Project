import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import productRoutes from './routes/productRoute.js';
import categoryRoutes from './routes/categoryRoute.js';
import brandRoute from './routes/brandRoute.js';
import subCategoryRoute from './routes/subCategoryRoute.js';
import sandiaRoutes from './routes/sandiaRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:3000",
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    })
)
app.use(cors());

app.use('/api', userRoutes);
app.use('/api', productRoutes);
app.use('/api', categoryRoutes);
app.use('/api',brandRoute);
app.use('/api',subCategoryRoute);
app.use('/api',sandiaRoutes);
app.use('/api',orderRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
