import { Entity, ObjectIdColumn, Column } from "typeorm";
import { ObjectId } from "mongodb";
import { titrationEnum } from "../../types/titrationEnum";

@Entity("Professors")
export class ProfessorEntity {
    @ObjectIdColumn()
    _id!: ObjectId;

    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column({ enum: titrationEnum })
    titration!: titrationEnum;

    @Column()
    unitId!: string;

    @Column()
    reference!: string;

    @Column()
    lattes!: string;

    @Column()
    coursesId!: ObjectId[];

    @Column()
    activityStatus!: string;

    @Column()
    notes!: string;
}
