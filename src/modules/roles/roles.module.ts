import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/modules/users/users.module";
import { RoleEntity } from "./role.entity";
import { RolesController } from "./roles.controller";
import { RolesRepository } from "./roles.repository";
import { RolesService } from "./roles.service";

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity]), UsersModule],
  controllers: [RolesController],
  providers: [RolesService, RolesRepository],
})
export class RolesModule { }
