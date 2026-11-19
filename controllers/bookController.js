import mongoose from 'mongoose';
import Book from '../models/Book.js';

// helper: is this a valid MongoDB _id?
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// GET /api/books  -> all books (newest first)
export const getBooks = async (req, res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1 });
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/books/:id  -> one book
export const getBookById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return res.status(400).json({ message: 'Invalid book id' });

        const book = await Book.findById(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/books  -> create a book
export const createBook = async (req, res) => {
    try {
        const book = await Book.create(req.body);
        res.status(201).json(book);
    } catch (error) {
        // ValidationError = a required field is missing or has the wrong type
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

// PUT /api/books/:id  -> update a book
export const updateBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return res.status(400).json({ message: 'Invalid book id' });

        const book = await Book.findByIdAndUpdate(id, req.body, {
            returnDocument: 'after', // send back the UPDATED book
            runValidators: true,     // still check the schema rules
        });
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json(book);
    } catch (error) {
        const status = error.name === 'ValidationError' ? 400 : 500;
        res.status(status).json({ message: error.message });
    }
};

// DELETE /api/books/:id  -> delete a book
export const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        if (!isValidId(id)) return res.status(400).json({ message: 'Invalid book id' });

        const book = await Book.findByIdAndDelete(id);
        if (!book) return res.status(404).json({ message: 'Book not found' });

        res.json({ message: 'Book deleted', book });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
