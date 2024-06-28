import {Router} from "express";
import {getAllUsers, addUser, updateUser, deleteUser, getUserById} from "./userRoutes";

const router = Router()
const usersRout = '/users'

router.get('/', (req, res) => {
    res.json('Go to /users to see magick')
})
router.post(usersRout, async (req, res) => {
    res.json(await addUser({name: req.body.name, age: req.body.age}))
})
router.get(usersRout, async (req, res) => {
    res.json(await getAllUsers())
})
router.get(usersRout + '/:id', async (req, res) => {
    res.json(await getUserById(req.params.id))
})
router.put(usersRout + '/:id', async (req, res) => {
    const {name, age} = req.body;
    res.json(await updateUser(req.params.id, {name, age}));
});
router.delete(usersRout + '/:id', async (req, res) => {
    res.json(await deleteUser(req.params.id));
})

export default router
