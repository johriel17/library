import express from 'express'
import cors from 'cors'

const PORT = 4000

//routes
import booksRoute from './routes/booksRoute.js'
import dashboardRoute from './routes/dashboardRoute.js'

const app = express()

app.use(express.json());
app.use(cors())

//route middlewware
app.use('/api/books', booksRoute)
app.use('/api/dashboard', dashboardRoute)

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})