import express from 'express'
import cors from 'cors'

const PORT = 4000

const app = express()

app.use(express.json());
app.use(cors())

app.listen(PORT, () => {
    console.log(`listening to port ${PORT}`)
})