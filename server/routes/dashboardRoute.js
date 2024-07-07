import express from 'express'
import { booksCount } from '../controllers/daschboardController.js'


const router = express.Router()


router.get('/', booksCount)

export default router