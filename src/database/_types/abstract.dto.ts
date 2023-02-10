import { ApiProperty } from "@nestjs/swagger";

export abstract class AbstractDTO {
	constructor(data?: Partial<AbstractDTO>) {
		Object.assign(this, data);
	}

	@ApiProperty({ type: "number", example: 1 })
	id?: number;

	@ApiProperty({ name: "created_at" })
	createdAt?: Date;

	@ApiProperty({ name: "updated_at" })
	updatedAt?: Date;
}
