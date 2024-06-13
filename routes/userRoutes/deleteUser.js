const userDB = require("../../data-sql");

module.exports = async (request, result) => {
    const id = parseInt(request.url.split('/')[2])
    const isDeleted = await userDB.deleteUser(id)

    if (isDeleted) {
        result.writeHead(204)
        result.end()
    } else {
        result.writeHead(405)
        result.end(JSON.stringify({message: 'User not found'}))
    }
}