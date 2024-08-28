import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { GradeLevel } from "./entities/gradeLevel.entity";
import { GradeLevelResolver } from "./gradeLevel.resolver";
import { GradeLevelService } from "./gradeLevel.service";

@Module({
  imports: [TypeOrmModule.forFeature([GradeLevel])],
  providers: [GradeLevelResolver, GradeLevelService],
  controllers: [],
})
export class GradeLevelModule {}
