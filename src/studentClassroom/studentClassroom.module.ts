import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { StudentClassroom } from "./entities/studentClassroom.entity";
import { Classroom } from "@classroom/entities/classroom.entity";
import { StudentClassroomService } from "./studentClassroom.service";
import { Student } from "@student/entities/student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([StudentClassroom, Student, Classroom])],
  providers: [StudentClassroomService],
})
export class StudentClassroomModule {}
