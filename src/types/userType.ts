import { ObjectId } from "mongodb";
import { UserAcess } from "../modules/Users/userEntity";

export type UserType = {
    id: ObjectId
    username: string
    email: string
    password: string
    type?: UserAcess
}