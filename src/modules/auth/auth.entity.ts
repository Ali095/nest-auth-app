import { Column, Entity } from "typeorm";
import { AbstractEntity } from "../database/abstract.entity";

@Entity()
export class UserAuthentication extends AbstractEntity {
	@Column({ unique: true })
	public email: string;

	@Column()
	public password: string;
}
