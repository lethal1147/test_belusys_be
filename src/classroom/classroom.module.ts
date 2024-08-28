import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { ClassroomResolver } from "@classroom/classroom.resolver";
import { ClassroomService } from "@classroom/classroom.service";
import { Classroom } from "./entities/classroom.entity";
import { Student } from "@student/entities/student.entity";
import { StudentClassroom } from "src/studentClassroom/entities/studentClassroom.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Classroom, Student, StudentClassroom])],
  providers: [ClassroomService, ClassroomResolver],
  controllers: [],
})
export class ClassroomModule {}
