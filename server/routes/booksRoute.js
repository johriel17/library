import express from 'express'
import { getBooks, getBook, addBook, updateBook, deleteBook, borrowBook } from '../controllers/booksController.js'


const router = express.Router()


router.get('/', getBooks)
router.get('/:id', getBook)
router.post('/', addBook)
router.put('/:id', updateBook)
router.delete('/:id', deleteBook)
router.post('/borrow-book', borrowBook)

export default router