import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity('usersdb')
export class Users {
    @PrimaryGeneratedColumn()
    id!: number

    @Column({type: 'varchar', length: 255})
    name!: string

    @Column({type: 'int'})
    age!: number
}
