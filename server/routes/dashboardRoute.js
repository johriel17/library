import express from 'express'
import { booksCount, BorrowedBooksCount, notReturnedBooksCount } from '../controllers/daschboardController.js'


const router = express.Router()


router.get('/books-count', booksCount)
router.get('/borrowed-count', BorrowedBooksCount)
router.get('/not-returned-count', notReturnedBooksCount)

export default router