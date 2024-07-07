import express from 'express'
import { selectBook } from '../controllers/selectController.js'


const router = express.Router()


router.get('/select-book', selectBook)

export default router