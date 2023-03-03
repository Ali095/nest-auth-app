import {
  ValidationPipe, ParseIntPipe, Controller, Param, Post, Body, Get, Put, Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { TOKEN_NAME } from "src/config";
import {
  ApiDocument,
  PaginationParams, PaginationRequest, PaginationResponseDto,
} from "../../common";
import {
  CreateUserRequestDto, UpdateUserRequestDto, UserFilterParams, UserResponseDto,
} from "./_types";
import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth(TOKEN_NAME)
@Controller({
  path: "users",
  version: "1",
})
export class UsersController {
  constructor(private usersService: UsersService) { }

  @ApiDocument({
    requestDescription: "Fetch the list of all users",
    responseDescription: "Fetched the paginated users list with their details",
    returnDataDto: UserResponseDto,
    pagination: true,
    successStatusCode: 200,
  })
  @ApiQuery({
    name: "search", type: "string", required: false, example: "admin",
  })
  @ApiQuery({
    name: "role_id", type: "number", required: false, example: "1",
  })
  @Get()
  public getUsers(@PaginationParams() pagination: PaginationRequest<UserFilterParams>)
    : Promise<PaginationResponseDto<UserResponseDto>> {
    return this.usersService.getUsers(pagination);
  }

  @Get("/:id")
  public getUserById(@Param("id", ParseIntPipe) id: number): Promise<UserResponseDto> {
    return this.usersService.getUserById(id);
  }

  // @Post()
  // public createUser(@Request() req, @Body(ValidationPipe) UserDto: CreateUserRequestDto): Promise<UserResponseDto> {
  //   return this.usersService.createUser(UserDto);
  // }

  @Put("/:id")
  public updateUser(@Param("id", ParseIntPipe) id: number, @Body(ValidationPipe) UserDto: UpdateUserRequestDto): Promise<UserResponseDto> {
    return this.usersService.updateUser(id, UserDto);
  }

  // changePassword(@Body(ValidationPipe) changePassword: ChangePasswordRequestDto, @CurrentUser() user: UserEntity): Promise<UserResponseDto> {}
}
