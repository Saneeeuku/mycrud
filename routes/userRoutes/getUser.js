import {getUserById as getById} from "../../data-sql.js"

export const getUser = async (request, result) => {
    const id = parseInt(request.url.split('/')[2])

    const user = await getById(id)
    if (user) {
        result.writeHead(200)
        result.end(JSON.stringify(user))
    } else {
        result.writeHead(402)
        result.end(JSON.stringify({message: 'User not found'}))
    }
}