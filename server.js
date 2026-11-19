import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bookRoutes from './routes/bookRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI. Add it to the .env file before starting the server.');
    process.exit(1);
}

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('BookStore API is running');
});

// all book routes live under /api/books (see routes/bookRoutes.js)
app.use('/api/books', bookRoutes);

// connect to MongoDB first, THEN start the server
mongoose
    .connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => {
            console.log(`Server running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    });
