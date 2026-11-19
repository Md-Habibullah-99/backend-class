import express from 'express';
import {
    getBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} from '../controllers/bookController.js';

const router = express.Router();

// server.js mounts this router at /api/books, so '/' here means /api/books
router.get('/', getBooks);          // GET    /api/books
router.get('/:id', getBookById);    // GET    /api/books/:id
router.post('/', createBook);       // POST   /api/books
router.put('/:id', updateBook);     // PUT    /api/books/:id
router.delete('/:id', deleteBook);  // DELETE /api/books/:id

export default router;
