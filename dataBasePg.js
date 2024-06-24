import pkg from 'pg';
import path from "path";
import {configDotenv} from "dotenv";

const __dirname = process.cwd()
configDotenv({override: true, path: path.join(__dirname, '.env')})

const {Pool} = pkg;
const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    port: parseInt(process.env.DB_PORT),
    password: process.env.PASSWORD,
    database: process.env.DATABASE
})

// const createTableQuery = `CREATE TABLE IF NOT EXISTS usersDB (
//   id SERIAL PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   age INT NOT NULL
// );`;
//
// pool.query(createTableQuery, (err, res) => {
//     if (err) {
//         console.error(err);
//     } else {
//         console.log('Table exists or created successfully');
//     }
// });
export default pool