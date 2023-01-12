import { Injectable, NotFoundException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import AuthenticateDto from "../dto/authenticate.dto";
import { IAuthenticate, Role } from "../interfaces/user.interface";

@Injectable()
export default class AuthService {
    users = [
        {
            id: "uuid1",
            userName: "Ali",
            password: "123",
            role: Role.Admin,
        },
        {
            id: "uuid2",
            userName: "Sam",
            password: "124",
            role: Role.Customer,
        },
    ];

    authenticate(authenticateDto: AuthenticateDto): IAuthenticate {
        const user = this.users.find(
            (u) => u.userName === authenticateDto.userName
                && u.password === authenticateDto.password,
        );

        if (!user) throw new NotFoundException("Invalid credentials");

        const token = sign({ ...user }, "secrete");

        return { token, user };
    }
}
