import {AppDataSource} from "../data-source"
import {Users} from "../entity/Users"

const userRepo = AppDataSource.getRepository(Users)

export const addUser = async (user: {name: string; age: number}) => {
    if (!user.name || !user.age) {
        return null
    }
    try {
        const newUser = userRepo.create(user)
        await userRepo.save(newUser)
        return newUser
    } catch (err) {
        console.log('Some error on adding', err)
        return null
    }
}
export const deleteUser = async (id: number) => {
    try{
        const res = await userRepo.delete(id)
        return (res.affected ?? 0) > 0
    }catch (err){
        console.log('Some error on deletion', err)
        return null
    }
}
export const getAllUsers = async () => {
    try {
        return await userRepo.find()
    } catch (err) {
        console.log('Some error on get all', err)
        return null
    }
}
export const getUserById = async (id: number) => {
    try {
        return await userRepo.findOneBy({id})
    } catch (err) {
        console.log('Some error on get by id', err)
        return null
    }
}
export const updateUser = async (id: number, newInfo: {name: string; age: number}) => {
    try {
        const user = await userRepo.findOneBy({id})
        if (!user) {return null}
        userRepo.merge(user, newInfo)
        await userRepo.save(user)
        return user
    } catch (err) {
        console.log('Some error on update', err)
        return null
    }
}