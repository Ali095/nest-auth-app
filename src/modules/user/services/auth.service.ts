import { Injectable, NotFoundException } from "@nestjs/common";
import { sign } from "jsonwebtoken";
import { AuthenticateDto } from "../dto";
import { IAuthenticate } from "../interfaces/user.interface";

@Injectable()
export default class AuthService {
    users = [
        {
            id: "uuid1",
            userName: "Ali",
            password: "123",
        },
        {
            id: "uuid2",
            userName: "Sam",
            password: "124",
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
