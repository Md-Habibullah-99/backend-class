import mongoose from 'mongoose';

// What one book document looks like in the "books" collection.
// Fields match the sample data in seed.js.
const bookSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, trim: true },
        author: { type: String, required: true, trim: true },
        price: { type: Number, required: true, min: 0 },
        description: { type: String, default: '' },
        stock: { type: Number, default: 0, min: 0 },
        cover: { type: String, default: '' }, // image URL
    },
    { timestamps: true } // adds createdAt and updatedAt automatically
);

const Book = mongoose.model('Book', bookSchema);

export default Book;
