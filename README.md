# BookStore API (Express + MongoDB)

## Run it
```bash
npm install
node seed.js     # adds 5 sample books
npm run dev      # starts the server on http://localhost:3000
```

## Routes
| Method | URL                 | What it does   |
| ------ | ------------------- | -------------- |
| GET    | /api/books          | all books      |
| GET    | /api/books/:id      | one book       |
| POST   | /api/books          | create a book  |
| PUT    | /api/books/:id      | update a book  |
| DELETE | /api/books/:id      | delete a book  |

Import `book_store_api.postman_collection.json` into Postman to test them.

## Folders
- `models/Book.js` - what a book looks like in MongoDB
- `controllers/bookController.js` - the code for each route
- `routes/bookRoutes.js` - connects URLs to controller functions
- `server.js` - starts Express and connects to MongoDB
- `seed.js` - fills the database with sample books
