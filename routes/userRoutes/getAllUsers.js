const userDB = require("../../data");

module.exports = (request, result) => {
    result.writeHead(200)
    result.end(JSON.stringify(userDB.getAllUsers()))
}