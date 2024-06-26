const url = require('url')
const getAllUsers = require('./getAllUsers'),
    getUser = require('./getUser'),
    deleteUser = require('./deleteUser'),
    updateUser = require('./updateUser'),
    addUser = require('./addUser');
const userRoutes = (request, result) => {
    const parsedUrl = url.parse(request.url, true)
    const method = request.method
    const path = parsedUrl.pathname

    result.setHeader('Content-Type', 'application/json')

    if (path === '/users'){
        if (method === 'GET'){
            getAllUsers(request, result)
        } else if (method === 'POST'){
            addUser(request, result)
        }
    } else if (path.startsWith('/users/')) {
        if (method === 'GET') {
            getUser(request, result)
        } else if (method === 'PUT') {
            updateUser(request, result)
        } else if (method === 'DELETE') {
            deleteUser(request, result)
        } else {
        result.writeHead(404)
        result.end(JSON.stringify({message: 'Route not found in users'}))
        }
    }
}

module.exports = userRoutes
