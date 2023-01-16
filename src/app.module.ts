import { Module } from "@nestjs/common";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/users.module";
import { configurationModule } from "./config/config.module";

@Module({
    imports: [
        configurationModule,
        AuthModule,
        UsersModule,
    ],
})
export class AppModule { }
