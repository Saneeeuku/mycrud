import db from '../dataBasePg.js'

export const addUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }
    const {name, age} = req.body
    if (!name || !age) {
        return res.status(400).send('Name and age are required');
    }
    if (!Number.isInteger(parseFloat(age)) || isNaN(Number(age)) ) {
        return res.status(400).send('Age incorrect');
    }
    const user = await db.query('INSERT INTO usersDB (name, age) VALUES ($1, $2) RETURNING *', [name, age])
    res.status(202).send(user.rows[0])
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const isDeleted = await db.query('DELETE FROM usersDB WHERE id = $1', [id])
    if (isDeleted.rowCount === 0) {
        return res.status(404).send('User not found for deletion');
    }
    res.status(204).json({message: 'User deleted successfully'});
}
export const getAllUsers = async (req, res) => {
    const users = await db.query('SELECT * FROM usersDB', [])
    res.status(202).json(users.rows)
}
export const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await db.query('SELECT * FROM usersDB WHERE id = $1', [id])
    if (user.rowCount === 0) {
        return res.status(404).send('User not found by ID');
    }
    res.status(202).json(user.rows[0]);
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        return res.status(400).send('Request body is missing');
    }
    const {name, age} = req.body;
    const updatedUser = await db.query('UPDATE usersDB SET name = $1, age = $2 WHERE id = $3 RETURNING *',
        [name, age, id])
    if (updatedUser.rowCount === 0) {
        return res.status(404).send('User not found to update');
    }
    res.status(202).json(updatedUser.rows[0]);
}