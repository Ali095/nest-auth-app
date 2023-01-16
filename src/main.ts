/* eslint-disable global-require */
import { NestFactory } from "@nestjs/core";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigMapper, SecretConfig } from "./config/config.module";
import { AppModule } from "./app.module";
import { TransformInterceptor } from "./_interceptors/transform.interceptor";

async function bootstrap() {
    const app = await NestFactory.create(AppModule, { bufferLogs: true });
    const configService = app.get(ConfigService);

    const appConfig = configService.get<SecretConfig>(ConfigMapper.appConfig);
    app.setGlobalPrefix(appConfig.APIPrefix);

    app.useGlobalInterceptors(new TransformInterceptor());

    app.useGlobalPipes(new ValidationPipe({
        validatorPackage: require("class-validator"),
        transformerPackage: require("class-transformer"),
        // whitelist: true,
        forbidUnknownValues: true,
        forbidNonWhitelisted: true,
        transformOptions: {
            enableImplicitConversion: true,
        },
    }));

    await app.listen(appConfig.port);
    Logger.log(`App is running in "${appConfig.nodeEnv}" mode, and it is listening at: http://localhost:${appConfig.port}/${appConfig.APIPrefix}/`);
}
bootstrap();
