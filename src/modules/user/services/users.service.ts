import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersService {
  async getUsers(): Promise<any[]> {
    return ["Hello I am new user"];
  }
}
