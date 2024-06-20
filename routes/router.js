import {Router} from "express";
import {getAllUsers, addUser, updateUser, deleteUser, getUserById} from "./userRoutes.js";

const router = Router()

router.get('/', (req, res) => {
    res.json('Go to /users to see magick')
})
router.post('/users', addUser)
router.get('/users', getAllUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
