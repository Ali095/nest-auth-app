import { Module, MiddlewareConsumer, NestModule } from "@nestjs/common";
import { APP_FILTER } from "@nestjs/core";
import { AllExceptionsFilter } from "src/errors/general.error";
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
    providers: [{
        provide: APP_FILTER,
        useClass: AllExceptionsFilter,
    }],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): void {
        consumer.apply(ApiLogger).forRoutes("*");
    }
}
