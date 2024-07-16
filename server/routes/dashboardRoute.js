import express from 'express'
import { booksCount, borrowedBooksCount, notReturnedBooksCount } from '../controllers/daschboardController.js'


const router = express.Router()


router.get('/books-count', booksCount)
router.get('/borrowed-count', borrowedBooksCount)
router.get('/not-returned-count', notReturnedBooksCount)

export default router