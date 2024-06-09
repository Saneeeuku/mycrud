const userDB = require("../../data");

module.exports = (request, result) => {
    const id = parseInt(request.url.split('/')[2])
    let body = ''

    request.on('userDB', chunk => {
        body += chunk
    })
    request.on('end', () => {
        const parsedBody = new URLSearchParams(body)
        const newInfo = {}
        parsedBody.forEach((key, val) => {
            newInfo[key] = key === 'age' ? parseInt(val) : val
        })

        const updatedUser = userDB.updateUser(id, newInfo)

        if (updatedUser) {
            result.writeHead(200)
            result.end(JSON.stringify(updatedUser))
        } else {
            result.writeHead(403)
            result.end(JSON.stringify({message: 'User not found'} ))
        }
    })
}
