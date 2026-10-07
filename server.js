// server/server.js
// Main entry point for the Express backend

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

// import bookRoutes from './routes/bookRoutes.js';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Missing MONGODB_URI. Add it to the .env file before starting the server.');
    process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// app.use('/api/books', bookRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.send('BookStore API is running');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
