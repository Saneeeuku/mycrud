import {addUser as add} from "../../data-sql.js"

export const addUser = async (request, result) => {
    let body = ''
    await request.on('data', chunk => {
        body += chunk
    })
    await request.on('end', () => {
        const parsedBody = new URLSearchParams(body)
        const name = parsedBody.get('name')
        const age = parsedBody.get('age')

        if (name && age) {
            const user = {name, age: parseInt(age)}
            add(user)
            result.writeHead(200)
            result.end(JSON.stringify(user))
        } else {
            result.writeHead(401)
            result.end(JSON.stringify({message: 'Name and age are required'} ))
        }
    })
}