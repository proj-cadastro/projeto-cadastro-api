import { ObjectId } from "mongodb";
import { UserAcess } from "./userAcess";

export type UserType = {
    id?: ObjectId
    username: string
    email: string
    password: string
    type?: UserAcess
}