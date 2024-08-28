import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Classroom } from "@classroom/entities/classroom.entity";
import { GetAllClassroomFilterType } from "src/types/classroomType";
import { Repository } from "typeorm";
import { CreateClassroomDto } from "./dto/createNewClassroom.dto";
import { EditClassroomDto } from "./dto/editClassroom.dto";
import { StudentClassroom } from "src/studentClassroom/entities/studentClassroom.entity";

@Injectable()
export class ClassroomService {
  constructor(
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>,
    @InjectRepository(StudentClassroom)
    private studentClassroomRepository: Repository<StudentClassroom>
  ) {}

  async findAllClassroom(): Promise<Classroom[]> {
    const query = this.classroomRepository.createQueryBuilder("classroom");

    return await query.getMany();
  }

  async findAllClassroomWithStudents(
    filters: GetAllClassroomFilterType = {}
  ): Promise<Classroom[]> {
    const { classroomid, classname, homeroomTeacher } = filters;
    const query = this.classroomRepository
      .createQueryBuilder("c")
      .leftJoinAndSelect("c.studentClassrooms", "sc")
      .leftJoinAndSelect("sc.student", "s")
      .leftJoinAndSelect("s.prefix", "p");

    if (classroomid) {
      query.andWhere("c.classroomid = :classroomid", { classroomid });
    }

    if (classname) {
      query.andWhere("c.classname LIKE :classname", {
        classname: `%${classname}%`,
      });
    }

    if (homeroomTeacher) {
      query.andWhere("c.homeroom_teacher LIKE :homeroomTeacher", {
        homeroomTeacher,
      });
    }

    const classrooms = await query.getMany();
    return classrooms;
  }

  async getOneClassroom(classroomid: number): Promise<Classroom> {
    const classroom = await this.classroomRepository.findOne({
      where: { classroomid },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${classroomid} not found`);
    }

    return classroom;
  }

  async createNewClassroom(
    createClassroomDto: CreateClassroomDto
  ): Promise<Classroom> {
    const newClassroom = this.classroomRepository.create(createClassroomDto);
    return this.classroomRepository.save(newClassroom);
  }

  async editClassroom(editClassroomDto: EditClassroomDto): Promise<Classroom> {
    const { classroomid, classname, academic_year, homeroom_teacher } =
      editClassroomDto;

    const classroom = await this.classroomRepository.findOne({
      where: { classroomid },
    });
    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${classroomid} not found`);
    }

    if (classname !== undefined) classroom.classname = classname;
    if (academic_year !== undefined) classroom.academic_year = academic_year;
    if (homeroom_teacher !== undefined)
      classroom.homeroom_teacher = homeroom_teacher;

    return this.classroomRepository.save(classroom);
  }

  async deleteClassroom(classroomid: number): Promise<boolean> {
    const classroom = await this.classroomRepository.findOne({
      where: { classroomid },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${classroomid} not found`);
    }

    await this.studentClassroomRepository.delete({
      classroom: { classroomid },
    });

    await this.classroomRepository.remove(classroom);

    return true;
  }
}
