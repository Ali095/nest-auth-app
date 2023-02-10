import { ApiProperty } from "@nestjs/swagger";
import { PermissionDto } from "../../permissions/_types";
import { RoleDto } from "../../roles/_types";

export class UserResponseDto {
	@ApiProperty()
	id: number;

	@ApiProperty({ name: "first_name" })
	firstName: string;

	@ApiProperty({ name: "last_name" })
	lastName: string;

	@ApiProperty({ example: "UTC+05:00" })
	timezone: string;

	@ApiProperty({ example: "Company Name" })
	company: string;

	@ApiProperty({ type: [RoleDto] })
	roles?: RoleDto[];

	@ApiProperty({ type: [PermissionDto] })
	permissions?: PermissionDto[];

	@ApiProperty({ example: "https://example.com" })
	profilePicture?: string;
}
