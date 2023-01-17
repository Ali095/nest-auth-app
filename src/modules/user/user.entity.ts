import { isEmail } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "../database/abstract.entity";

@Entity()
class User extends AbstractEntity {
	@Column({ unique: true })
	public email: string;

	@Column()
	public name: string;

	@Column()
	public password: string;
}

export default User;
