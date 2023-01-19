import {
  CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn,
} from "typeorm";

export abstract class AbstractEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn({
    type: "timestamp without time zone",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp without time zone",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP",
  })
  updatedAt: Date;
}
