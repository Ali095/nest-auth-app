import {
  Body, Controller, Delete, Get, Param, Patch, Post, Query, Headers, UseGuards, UseInterceptors,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { UsersService } from "../services/users.service";
import { ResponseMessage } from "../../../common/decorators/response.decorator";

@Controller("users")
@UseGuards(AuthGuard())
export class UsersController {
  constructor(private userService: UsersService) { }

  @Get()
  @ResponseMessage("List of all users")
  async getUsers(@Headers("Authorization") authorization): Promise<any[]> {
    return this.userService.getUsers();
  }
}
