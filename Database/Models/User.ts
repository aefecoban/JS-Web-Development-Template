import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    ID: number;

    @Column()
    Name : string;

    @Column()
    Surname : string;
    
    @Column({ nullable: false })
    Nickname : string;

    @Column({ nullable: false })
    Password : string;

    @Column()
    Email : string;

    @Column()
    Phone : string;

    @Column({ default: true, nullable: false })
    IsActive : boolean;

    @ManyToMany(() => User)
    @JoinTable()
    AddressBook : User[];

}
