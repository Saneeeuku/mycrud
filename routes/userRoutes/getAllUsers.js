import {getAllUsers as get} from "../../data-sql.js"

    export const getAllUsers = async (request, result) => {
    result.writeHead(200)
    result.end(JSON.stringify(await get()))
}