import {updateUser as update} from "../../data-sql.js"

export const updateUser = async (request, result) => {
    const id = parseInt(request.url.split('/')[2])
    let body = ''

    await request.on('data', chunk => {
        body += chunk
    })
    await request.on('end', () => {
        const parsedBody = new URLSearchParams(body)
        const newInfo = {}
        parsedBody.forEach((val, key) => {
            newInfo[key] = key === 'age' ? parseInt(val) : val
        })

        const updatedUser = update(id, newInfo)

        if (updatedUser) {
            result.writeHead(200)
            result.end(JSON.stringify(updatedUser))
        } else {
            result.writeHead(403)
            result.end(JSON.stringify({message: 'User not found'} ))
        }
    })
}
