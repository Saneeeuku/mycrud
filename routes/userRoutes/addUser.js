const userDB = require("../../data");

module.exports = (request, result) => {
    let body = ''
    request.on('userDB', chunk => {
        body += chunk
    })
    request.on('end', () => {
        const parsedBody = new URLSearchParams(body)
        const name = parsedBody.get('name')
        const age = parsedBody.get('age')

        if (name && age) {
            const user = {name, age: parseInt(age)}
            userDB.addUser(user)
            result.writeHead(200)
            result.end(JSON.stringify(user))
        } else {
            result.writeHead(401)
            result.end(JSON.stringify({message: 'Name and age are required'} ))
        }
    })
}