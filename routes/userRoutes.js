import {
    addUser as add,
    deleteUser as del,
    getAllUsers as getAll,
    getUserById as getById,
    updateUser as upd
} from "../data-sql.js"

export const addUser = async (req, res) => {
    if (!req.body) {
        console.log(req, '\n', req.body, '\n',req.params)
    }
    const {name, age} = req.body
    if (!name || !age) {
        return res.status(400).send('Name and age are required');
    }
    const user = {name, age: parseInt(age)}
    await add(user)
    res.status(202).send(user)
}
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const isDeleted = await del(id)
    if (!isDeleted) {
        return res.status(404).send('User not found');
    }
    res.status(204).json({message: 'User deleted successfully'});
}
export const getAllUsers = async (req, res) => {
    res.status(202).json(await getAll())
}
export const getUserById = async (req, res) => {
    const id = req.params.id;
    const user = await getById(id)
    if (!user) {
        return res.status(404).send('User not found');
    }
    res.status(202).json(user);
}
export const updateUser = async (req, res) => {
    const id = req.params.id;
    if (!req.body) {
        console.log(req.body, req.params)
        return res.status(400).send('Request body is missing');
    }
    const {name, age} = req.body;
    const updatedUser = await upd(id, {name, age})
    if (!updatedUser) {
        return res.status(404).send('User not found');
    }
    res.status(202).json(updatedUser);
}