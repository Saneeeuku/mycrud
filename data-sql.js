const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('usersDataBase.db')

db.run(`CREATE TABLE IF NOT EXISTS usersDB (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL
)`)

module.exports = {
    async addUser(user) {
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
    },

    async getAllUsers() {
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
    },

    // Показать юзера по id
    async getUserById(id) {
        return await new Promise((resolve, reject) => {
            db.run('SELECT * FROM usersDB WHERE id = ?', [id], (err, row) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(row)
                }
            })
        })
    },

    // Обновление информации юзера
    async updateUser(id, newInfo) {
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
        return this.getUserById(id)
    },

    // Удаление юзера
    async deleteUser(id) {
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
}