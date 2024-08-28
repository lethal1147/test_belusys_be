import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { StudentClassroom } from "./entities/studentClassroom.entity";

@Injectable()
export class StudentClassroomService {
  constructor(
    @InjectRepository(StudentClassroom)
    private studentClassroomRepository: Repository<StudentClassroom>
  ) {}
}
