import express from 'express'
import router from "./routes/router.js";

const server = express()
const PORT = process.env.PORT ?? 3000

server.use(express.json())
server.use(express.urlencoded({extended: true}))
server.use(router)

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`)
})
// console.log(
//     typeof process.env.HOST,
//     typeof process.env.USER,
//     typeof process.env.DB_PORT,
//     typeof process.env.PASSWORD,
//     typeof process.env.DATABASE)
