// userService.ts
import { AppDataSource } from "../../data-source";
import { UserAcess } from "./userEntity";
import { ObjectId } from "mongodb";
import { UserEntity } from "./userEntity";
import { UserType } from "../../types/userType";

const userRepository = AppDataSource.getRepository(UserEntity);

export async function findAllUsersService() {
    return await userRepository.find();
}

export async function findUserByIdService (id: ObjectId){
    return await userRepository.findOneBy({ id })
}

export async function createUserService(userData: UserType) {
    const newUser = userRepository.create({
        ...userData,
        type: userData.type ? userData.type : UserAcess.USER
    })
    return await userRepository.save(newUser)
}

export async function deleteUserByIdService (id: ObjectId) {
    return await userRepository.delete(id)
}
