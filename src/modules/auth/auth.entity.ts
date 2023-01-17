import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../database/abstract.entity";

@Entity()
export class User extends AbstractEntity {
	@Column({ unique: true })
	public email: string;

	@Column()
	public password: string;
}
