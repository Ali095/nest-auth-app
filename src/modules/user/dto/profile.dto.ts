import { Role } from "../interfaces/user.interface";

export default class ProfileDto {
    readonly id: string;

    readonly userName: string;

    readonly password: string;

    readonly role: Role;
}
