const url = require('url')
const userRoutes = require('./userRoutes/userRoutes')
const routeHandler = (request, result) => {
    const parsedUrl = url.parse(request.url, true)
    const path = parsedUrl.pathname
    if (path === '/users' || path.startsWith('/users/')) {
        userRoutes(request, result)
    } else {
        result.setHeader('Content-Type', 'application/json')
        result.writeHead(404)
        result.end(JSON.stringify({message: 'Route not found'}))
    }
}
module.exports = routeHandler