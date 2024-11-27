// userService.ts
import { AppDataSource } from "../../data-source";
import { UserAcess } from "../../types/userAcess";
import { ObjectId } from "mongodb";
import { UserEntity } from "./userEntity";
import { UserType } from "../../types/userType";

const userRepository = AppDataSource.getRepository(UserEntity);

export async function findAllUsersService() {
    return await userRepository.find();
}

export async function findUserByIdService (id: ObjectId){
    const result = await userRepository.findOneBy({ _id: id });
    return result;
}

export async function createUserService(userData: UserType) {
    const newUser = userRepository.create({
        ...userData,
        type: userData.type ? userData.type : UserAcess.USER
    })
    return await userRepository.save(newUser)
}

export async function deleteUserByIdService (id: ObjectId) {
    return await userRepository.delete({ _id: id })
}

export async function findUserByEmail(email: string) {
    return await userRepository.findOneBy({ email });
}
  