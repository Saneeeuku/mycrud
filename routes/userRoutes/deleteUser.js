import {deleteUser as del} from "../../data-sql.js"

export const deleteUser = async (request, result) => {
    const id = parseInt(request.url.split('/')[2])
    const isDeleted = await del(id)
    if (isDeleted) {
        result.writeHead(204)
        result.end()
    } else {
        result.writeHead(405)
        result.end(JSON.stringify({message: 'User not found'}))
    }
}