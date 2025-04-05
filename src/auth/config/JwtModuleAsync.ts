import { ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions, JwtModuleOptions } from "@nestjs/jwt";
import { config } from "process";

const jwtModuleOptions = (config: ConfigService): JwtModuleOptions => ({
    secret: config.get("JWT_SECRET"),
    signOptions: {
        expiresIn: config.get("JWT_EXP", "5m")
    }
})

export const options = () : JwtModuleAsyncOptions => ({
    inject: [ConfigService],
    useFactory: (config: ConfigService) => jwtModuleOptions(config),
})   