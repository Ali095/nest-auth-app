import { SetMetadata } from "@nestjs/common";

const Roles = (...args: string[]) => SetMetadata("roles", args);

export default Roles;
