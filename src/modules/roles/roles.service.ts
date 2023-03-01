import { NotFoundException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsersService } from "src/modules/users/users.service";
import {
  Pagination, PaginationFilters, PaginationRequest, PaginationResponseDto,
} from "../../common";
import {
  CreateRoleRequestDto, UpdateRoleRequestDto, RoleResponseDto, RoleMapper,
} from "./_types";
import { RolesRepository } from "./roles.repository";

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(RolesRepository)
    private rolesRepository: RolesRepository,
    private usersService: UsersService,
  ) { }

  /**
   * Get a paginated role list
   * @param pagination {PaginationRequest}
   * @returns {Promise<PaginationResponseDto<RoleResponseDto>>}
   */
  public async getRoles(pagination: PaginationRequest<PaginationFilters>): Promise<PaginationResponseDto<RoleResponseDto>> {
    const [roleEntities, totalRoles] = await this.rolesRepository.getRolesAndCount(pagination);

    const userCountPromise: Promise<number>[] = [];

    let roleDtos = await Promise.all(roleEntities.map((e) => {
      userCountPromise.push(this.usersService.countUsersByRole(e.id));
      return RoleMapper.toDtoWithRelations(e);
    }));

    const usersCountByRoles = await Promise.all(userCountPromise);

    roleDtos = roleDtos.map((r, i) => ({ ...r, userCount: usersCountByRoles[i] }));

    return Pagination.of(pagination, totalRoles, roleDtos);
  }

  /**
   * Get role by id
   * @param id {number}
   * @returns {Promise<RoleResponseDto>}
   */
  public async getRoleById(id: number): Promise<RoleResponseDto> {
    const roleEntity = await this.rolesRepository.findOne({ where: { id }, relations: ["permissions"] });
    if (!roleEntity) {
      throw new NotFoundException();
    }

    return RoleMapper.toDtoWithRelations(roleEntity);
  }

  /**
   * Create new role
   * @param roleDto {CreateRoleRequestDto}
   * @returns {Promise<RoleResponseDto>}
   */
  public async createRole(roleDto: CreateRoleRequestDto): Promise<RoleResponseDto> {
    let roleEntity = RoleMapper.toCreateEntity(roleDto);
    roleEntity = await this.rolesRepository.save(roleEntity);
    return RoleMapper.toDto(roleEntity);
  }

  /**
   * Update role by id
   * @param id {number}
   * @param roleDto {UpdateRoleRequestDto}
   * @returns {Promise<RoleResponseDto>}
   */
  public async updateRole(id: number, roleDto: Partial<UpdateRoleRequestDto>): Promise<RoleResponseDto> {
    let roleEntity = await this.rolesRepository.findOne({ where: { id } });
    if (!roleEntity) {
      throw new NotFoundException();
    }

    roleEntity = RoleMapper.toUpdateEntity(roleEntity, roleDto);
    roleEntity = await this.rolesRepository.save(roleEntity);
    return RoleMapper.toDto(roleEntity);
  }
}
