import { Module } from "@nestjs/common";
import { configurationModule } from "./config/config.module";
import { UserModule } from "./modules/user/user.module";

@Module({
    imports: [
        configurationModule,
        UserModule,
    ],
})
class AppModule { }

export default AppModule;
export { AppModule };
