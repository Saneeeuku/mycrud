import {Router} from "express";
import {getAllUsers, addUser, updateUser, deleteUser, getUserById} from "./userRoutes.js";

const router = Router()
const usersRout = '/users'

router.get('/', (req, res) => {
    res.json('Go to /users to see magick')
})
router.post(usersRout, addUser)
router.get(usersRout, getAllUsers)
router.get(usersRout + '/:id', getUserById)
router.put(usersRout + '/:id', updateUser)
router.delete(usersRout + '/:id', deleteUser)

export default router
