import { Module } from "@nestjs/common";
import { StudentService } from "../student/student.service";
import { StudentResolver } from "../student/student.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { GradeLevel } from "src/gradeLevel/entities/gradeLevel.entity";
import { Prefix } from "src/prefix/entities/prefix.entity";
import { StudentClassroom } from "src/studentClassroom/entities/studentClassroom.entity";
import { Classroom } from "@classroom/entities/classroom.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Student,
      Gender,
      GradeLevel,
      Prefix,
      Classroom,
      StudentClassroom,
    ]),
  ],
  providers: [StudentService, StudentResolver],
  controllers: [],
})
export class StudentModule {}
