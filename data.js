class Users {
    static userId = 0
    constructor() {
        this.users = [];
    }

    // Новый пользователь
    addUser(user) {
        user.id = ++Users.userId
        this.users.push(user);
    }

    // Показать всех юзеров
    getAllUsers() {
        if (this.users){
            return this.users;
        }
        return null
    }

    // Показать юзера по id
    getUserById (id) {
        let reqUserId = this.users.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            return this.users[reqUserId]
        }
        return 'No user with such ID'
    }

    // Обновление информации юзера
    updateUser(id, newInfo) {
        let reqUserId = this.users.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            this.users[reqUserId] = {...this.users[reqUserId], ...newInfo}
            return this.users[reqUserId]
        }
        return null
    }

    // Удаление юзера
    deleteUser(id) {
        let reqUserId = this.users.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            this.users.splice(reqUserId, 1)
            return true
        }
        return false
    }
}

let userDB = new Users();
userDB.addUser({name:'Alfredo', age: 24})
userDB.addUser({name:'Bilbo', age: 124})
module.exports = userDB;

/*let userDB1 = [
    {name:'Alfredo', age: 24, id: 1},
    {name:'Bilbo', age: 124, id: 2},
]
let currId = 3

module.exports = {
    addUser(user) {
        user.id = currId++
        userDB1.push(user);
    },

    // Показать всех юзеров
    getAllUsers() {
        if (userDB1){
            return userDB1;
        }
        return null
    },

    // Показать юзера по id
    getUserById (id) {
        let reqUserId = userDB1.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            return userDB1[reqUserId]
        }
        return 'No user with such ID'
    },

    // Обновление информации юзера
    updateUser(id, newInfo) {
        let reqUserId = userDB1.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            userDB1[reqUserId] = {...userDB1[reqUserId], ...newInfo}
            return userDB1[reqUserId]
        }
        return null
    },

    // Удаление юзера
    deleteUser(id) {
        let reqUserId = userDB1.findIndex(curr => curr.id === id)
        if (reqUserId !== -1){
            userDB1.splice(reqUserId, 1)
            return true
        }
        return false
    }
}*/




