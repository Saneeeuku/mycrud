//const userDB = require("../../data-sql");
import {getAllUsers as get} from "../../data-sql.js"

// module.exports
    export const getAllUsers = async (request, result) => {
    result.writeHead(200)
    result.end(JSON.stringify(await get()))
}