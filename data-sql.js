import pkg from 'sqlite3';
const {verbose} = pkg;

const sqlite3 = verbose()
const db = new sqlite3.Database('usersDataBase.db')

db.run(`CREATE TABLE IF NOT EXISTS usersDB (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`)

export const addUser = async (user) => {
    const lastId = await new Promise((resolve, reject) => {
        db.run('INSERT INTO usersDB (name, age) VALUES (?, ?)', [user.name, user.age], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(this.lastID)
            }
        })
    })
    return {id: lastId, ...user}
}

export const getAllUsers = async () => {
    try {
        return await new Promise((resolve, reject) => {
            db.all('SELECT * FROM usersDB', [], (err, rows) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    } catch (err) {
        return null
    }
}

export const getUserById = async (id) => {
    return await new Promise((resolve, reject) => {
        db.get('SELECT * FROM usersDB WHERE id = ?', [id], (err, row) => {
            if (err) {
                reject(err)
            } else {
                resolve(row)
            }
        })
    })
}
export const updateUser = async (id, newInfo) => {
    const changes = await new Promise((resolve, reject) => {
        db.run('UPDATE usersDB SET name = ?, age = ? WHERE id = ?',
            [newInfo.name, newInfo.age, id],
            function (err) {
                if (err) {
                    reject(err)
                } else {
                    resolve(this.changes)
                }
            })
    })
    if (changes === 0) {
        return null
    }
    return getUserById(id)
}

// Удаление юзера
export const deleteUser = async (id) => {
    const changes = await new Promise((resolve, reject) => {
        db.run('DELETE FROM usersDB WHERE id = ?', [id], function (err) {
            if (err) {
                reject(err)
            } else {
                resolve(this.changes)
            }
        })
    })
    return changes > 0
}