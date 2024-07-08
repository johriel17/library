import express from 'express'
import { getBorrowedBooks, getBorrowedBook, addBorrowedBook, updateBorrowedBook, deleteBorrowedBook, returnBook } from '../controllers/borrowedBooksController.js'


const router = express.Router()


router.get('/', getBorrowedBooks)
router.get('/:id', getBorrowedBook)
router.post('/', addBorrowedBook)
router.put('/:id', updateBorrowedBook)
router.delete('/:id', deleteBorrowedBook)
router.put('/return/:id/:book_id', returnBook)

export default router