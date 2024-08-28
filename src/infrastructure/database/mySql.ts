import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const getDatabaseConfig = (
  configService: ConfigService
): TypeOrmModuleOptions => ({
  type: "mysql",
  host: configService.get("DB_HOST"),
  port: +configService.get<number>("DB_PORT"),
  username: configService.get("DB_USERNAME"),
  password: configService.get("DB_PASSWORD"),
  database: configService.get("DB_NAME"),
  autoLoadEntities: true,
});

export default getDatabaseConfig;
