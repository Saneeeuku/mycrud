import express from 'express'
import routeHandler from './routes/router.js';
const server = express()
const PORT = process.env.PORT ?? 3000

server.use(routeHandler)

server.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`)
})
