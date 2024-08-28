import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import getDatabaseConfig from "@infrastructure/database/mySql";
import { GraphQLModule } from "@nestjs/graphql";
import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { join } from "path";
import { StudentClassroomModule } from "./studentClassroom/studentClassroom.module";
import { ClassroomModule } from "./classroom/classroom.module";
import { StudentModule } from "@student/student.module";
import { GradeLevelModule } from "./gradeLevel/gradeLevel.module";
import { GenderModule } from "./gender/gender.module";
import { PrefixModule } from "./prefix/prefix.module";

@Module({
  imports: [
    StudentModule,
    ClassroomModule,
    StudentClassroomModule,
    GradeLevelModule,
    GenderModule,
    PrefixModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        getDatabaseConfig(configService),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/schema.gql"),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
