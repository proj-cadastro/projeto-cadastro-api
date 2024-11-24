import { Entity, ObjectIdColumn, Column, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectId } from "mongodb";
import * as bcrypt from 'bcrypt';

export enum UserAcess {
    USER = 'user',
    ADMIN = 'admin'
}

@Entity('Users') 
export class UserEntity {
    @ObjectIdColumn()
    id!: ObjectId

    @Column()
    username!: string

    @Column({ unique: true })
    email!: string

    @Column({ select: false })
    password!: string

    @Column({ enum: UserAcess, default: UserAcess.USER })
    type!: UserAcess

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10)
        }
    }
}
