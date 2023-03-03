import { Injectable } from "@nestjs/common";
import { UserFilterParams } from "src/modules/users/_types";
import { DataSource, Repository } from "typeorm";
import { PaginationRequest } from "../../common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UsersRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

  /**
   * Get users list
   * @param pagination {PaginationRequest}
   * @returns [userEntities: UserEntity[], totalUsers: number]
   */
  public async getUsersAndCount(pagination: PaginationRequest<UserFilterParams>):
    Promise<[userEntities: UserEntity[], totalUsers: number]> {
    const {
      skip, limit: take, order, params: { search, roleId },
    } = pagination;

    const query = this.createQueryBuilder("u")
      .innerJoinAndSelect("u.userId", "ua")
      .innerJoinAndSelect("u.roles", "r", roleId ? `r.id = ${roleId}` : "")
      .leftJoinAndSelect("u.permissions", "p")
      .skip(skip)
      .take(take)
      .orderBy(order);

    if (search) {
      query.where(
        `ua.username ILIKE :search
        OR ua.email ILIKE :search
        OR u.first_name ILIKE :search
        OR u.last_name ILIKE :search
        OR r.name ILIKE :search
        `,
        { search: `%${search}%`, roleId: 6 },
      );
    }
    return query.getManyAndCount();
  }

  /**
   * find user by username
   * @param username {string}
   * @returns Promise<UserEntity>
   */
  async findUserByUsername(username: string): Promise<UserEntity> {
    return this.createQueryBuilder("u")
      .leftJoinAndSelect("u.roles", "r", "r.active = true")
      .leftJoinAndSelect("r.permissions", "rp", "rp.active = true")
      .leftJoinAndSelect("u.permissions", "p", "p.active = true")
      .where("u.username = :username", { username })
      .getOne();
  }
}
