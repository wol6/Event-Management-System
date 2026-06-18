import express from 'express'
import mongoose from 'mongoose'
import cors from "cors"
import cookieParser from 'cookie-parser'
import route from './routes/route.js'

const app = express()

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}))
app.use(express.json())
app.use(cookieParser())
app.use('/api', route)

mongoose.connect("mongodb://localhost:27017/events").then(() => {
    app.listen(5000, () => {
        console.log(`Connected to Server...`)
    })
}).catch((error) => {
    console.log(error)
})