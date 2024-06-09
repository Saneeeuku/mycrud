const userDB = require("../../data");

module.exports = (request, result) => {
    const id = parseInt(request.url.split('/')[2])
    const isDeleted = userDB.deleteUser(id)

    if (isDeleted) {
        result.writeHead(204)
        result.end()
    } else {
        result.writeHead(405)
        result.end(JSON.stringify({message: 'User not found'}))
    }
}