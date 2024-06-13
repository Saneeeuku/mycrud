const userDB = require("../../data-sql");

module.exports = async (request, result) => {
    result.writeHead(200)
    result.end(JSON.stringify(await userDB.getAllUsers()))
}