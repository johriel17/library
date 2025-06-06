import express from 'express'
import { getBorrowedBooks, getBorrowedBook, addBorrowedBook, updateBorrowedBook, deleteBorrowedBook, returnBook, notify } from '../controllers/borrowedBooksController.js'


const router = express.Router()

router.get('/notify', notify)
router.get('/', getBorrowedBooks)
router.get('/:id', getBorrowedBook)
router.post('/', addBorrowedBook)
router.put('/:id', updateBorrowedBook)
router.delete('/:id/:book_id', deleteBorrowedBook)
router.put('/return/:id/:book_id', returnBook)

export default router