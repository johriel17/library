import express from 'express'
import cors from 'cors'
import path, {dirname} from 'path'
import { fileURLToPath } from 'url';

//routes
import booksRoute from './routes/booksRoute.js'
import dashboardRoute from './routes/dashboardRoute.js'
import borrowedBooksRoute from './routes/borrowedBooksRoute.js'
import selectRoute from './routes/selectRoute.js'

const app = express()

app.use(express.json());
app.use(cors())

//route middlewware
app.use('/api/books', booksRoute)
app.use('/api/dashboard', dashboardRoute)
app.use('/api/borrowed-books', borrowedBooksRoute)
app.use('/api/select', selectRoute)
app.use('/api/roles', booksRoute)
app.use('/api/users', booksRoute)



const MODE = process.env.MODE

if(MODE === 'production'){
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    app.use(express.static(path.join(__dirname, "../client/dist")));

    app.get('*', (req,res) => 
        res.sendFile(path.join(__dirname, "../client/dist/index.html"))
    )

}

const PORT  = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})