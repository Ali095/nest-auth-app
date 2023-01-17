import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { DatabaseModule } from "./modules/database/database.module";
import { ApiLogger } from "./middlewares/api-logger.middleware";
import { AuthModule } from "./modules/auth/auth.module";
import { UsersModule } from "./modules/user/users.module";
import { configurationModule } from "./config/config.module";

@Module({
    imports: [
        configurationModule,
        AuthModule,
        UsersModule,
        DatabaseModule,
    ],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ApiLogger).forRoutes("*");
    }
}
