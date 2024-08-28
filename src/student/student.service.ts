import { Classroom } from "@classroom/entities/classroom.entity";
import { UpdateStudentDto } from "./dto/updateStudent.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "./entities/student.entity";
import { Repository } from "typeorm";
import { GetAllStudentFilterType } from "src/types/studentType";
import { Gender } from "src/gender/entities/gender.entity";
import { Prefix } from "src/prefix/entities/prefix.entity";
import { GradeLevel } from "src/gradeLevel/entities/gradeLevel.entity";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { StudentClassroom } from "src/studentClassroom/entities/studentClassroom.entity";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
    @InjectRepository(Gender) private genderRepository: Repository<Gender>,
    @InjectRepository(Prefix) private prefixRepository: Repository<Prefix>,
    @InjectRepository(GradeLevel)
    private gradeLevelRepository: Repository<GradeLevel>,
    @InjectRepository(StudentClassroom)
    private studentClassroomRepository: Repository<StudentClassroom>,
    @InjectRepository(Classroom)
    private classroomRepository: Repository<Classroom>
  ) {}

  async findAll(
    filters: GetAllStudentFilterType = {}
  ): Promise<{ data: Student[]; total: number }> {
    const {
      textSearch,
      studentid,
      gradelevelid,
      page = 1,
      pageLimit = 10,
    } = filters;
    const query = this.studentRepository
      .createQueryBuilder("student")
      .leftJoinAndSelect("student.prefix", "prefix")
      .leftJoinAndSelect("student.gender", "gender")
      .leftJoinAndSelect("student.gradeLevel", "gradeLevel")
      .leftJoinAndSelect("student.studentClassrooms", "studentClassrooms");
    if (textSearch) {
      query.andWhere(
        "student.firstname LIKE :textsearch OR student.lastname LIKE :textsearch",
        { textsearch: `%${textSearch}%` }
      );
    }

    if (studentid) {
      query.andWhere("student.studentid = :studentid", {
        studentid,
      });
    }

    if (gradelevelid) {
      query.andWhere("gradeLevel.gradelevelid = :gradelevelid", {
        gradelevelid,
      });
    }

    query.skip((page - 1) * pageLimit).take(pageLimit);
    const [data, total] = await query.getManyAndCount();
    return { data: data, total };
  }

  async findOneStudentById(studentid: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentid },
      relations: [
        "prefix",
        "gender",
        "gradeLevel",
        "studentClassrooms",
        "studentClassrooms.classroom",
      ],
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentid} not found`);
    }

    return student;
  }

  async createStudent(createStudentDto: CreateStudentDto): Promise<Student> {
    const {
      firstname,
      lastname,
      birthdate,
      prefixid,
      genderid,
      classroomid,
      gradelevelid,
    } = createStudentDto;

    const prefix = await this.prefixRepository.findOne({
      where: { prefixid },
    });
    if (!prefix) {
      throw new NotFoundException(`Prefix with ID ${prefixid} not found`);
    }
    const gender = await this.genderRepository.findOne({ where: { genderid } });
    if (!gender) {
      throw new NotFoundException(`Gender with ID ${genderid} not found`);
    }
    const gradeLevel = await this.gradeLevelRepository.findOne({
      where: { gradelevelid },
    });
    if (!gradeLevel) {
      throw new NotFoundException(
        `Grade level with ID ${gradelevelid} not found`
      );
    }
    const classroom = await this.classroomRepository.findOne({
      where: { classroomid },
    });
    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${classroomid} not found`);
    }

    const newStudent = this.studentRepository.create({
      firstname,
      lastname,
      gender,
      prefix,
      birthdate,
      gradeLevel,
    });
    const savedStudent = await this.studentRepository.save(newStudent);

    const newStudentClassroom = this.studentClassroomRepository.create({
      classroom,
      student: savedStudent,
    });

    await this.studentClassroomRepository.save(newStudentClassroom);
    return savedStudent;
  }

  async updateStudent(updateStudentDto: UpdateStudentDto): Promise<Student> {
    const {
      studentid,
      firstname,
      lastname,
      birthdate,
      prefixid,
      genderid,
      classroomid,
      gradelevelid,
    } = updateStudentDto;

    const student = await this.studentRepository.findOne({
      where: { studentid },
      relations: [
        "prefix",
        "gender",
        "gradeLevel",
        "studentClassrooms",
        "studentClassrooms.classroom",
      ],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentid} not found`);
    }

    if (firstname) student.firstname = firstname;
    if (lastname) student.lastname = lastname;
    if (birthdate) student.birthdate = birthdate;

    if (prefixid) {
      const prefix = await this.prefixRepository.findOne({
        where: { prefixid },
      });
      if (!prefix) {
        throw new NotFoundException(`Prefix with ID ${prefixid} not found`);
      }
      student.prefix = prefix;
    }

    if (genderid) {
      const gender = await this.genderRepository.findOne({
        where: { genderid },
      });
      if (!gender) {
        throw new NotFoundException(`Gender with ID ${genderid} not found`);
      }
      student.gender = gender;
    }

    if (gradelevelid) {
      const gradeLevel = await this.gradeLevelRepository.findOne({
        where: { gradelevelid },
      });
      if (!gradeLevel) {
        throw new NotFoundException(
          `Grade level with ID ${gradelevelid} not found`
        );
      }
      student.gradeLevel = gradeLevel;
    }

    if (classroomid) {
      const classroom = await this.classroomRepository.findOne({
        where: { classroomid },
      });
      if (!classroom) {
        throw new NotFoundException(
          `Classroom with ID ${classroomid} not found`
        );
      }

      const studentClassroom = await this.studentClassroomRepository.findOne({
        where: { student: { studentid: student.studentid } },
      });

      if (studentClassroom) {
        studentClassroom.classroom = classroom;
        await this.studentClassroomRepository.save(studentClassroom);
      } else {
        const newStudentClassroom = this.studentClassroomRepository.create({
          classroom,
          student,
        });
        await this.studentClassroomRepository.save(newStudentClassroom);
      }
    }

    return await this.studentRepository.save(student);
  }

  async deleteStudent(studentid: number): Promise<boolean> {
    const student = await this.studentRepository.findOne({
      where: { studentid },
      relations: ["studentClassrooms"],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentid} not found`);
    }

    if (student.studentClassrooms && student.studentClassrooms.length > 0) {
      await this.studentClassroomRepository.remove(student.studentClassrooms);
    }

    await this.studentRepository.remove(student);

    return true;
  }

  async getAllDropdown(): Promise<Student[]> {
    const students = await this.studentRepository.find({
      relations: ["prefix"],
    });

    return students;
  }

  async addStudentToClassroom(
    studentid: number,
    classroomid: number
  ): Promise<boolean> {
    const studentClassroom = await this.studentClassroomRepository.findOne({
      where: { student: { studentid } },
    });
    const classroom = await this.classroomRepository.findOne({
      where: { classroomid },
    });

    if (!classroom) {
      throw new NotFoundException(`Classroom with ID ${classroomid} not found`);
    }

    const student = await this.studentRepository.findOne({
      where: { studentid },
    });
    if (!student) {
      throw new NotFoundException(`Student with ID ${studentid} not found`);
    }

    if (studentClassroom) {
      studentClassroom.classroom = classroom;
      await this.studentClassroomRepository.save(studentClassroom);
    } else {
      const newStudentClassroom = this.studentClassroomRepository.create({
        classroom,
        student,
      });
      await this.studentClassroomRepository.save(newStudentClassroom);
    }

    return true;
  }

  async removeStudentFromClassroom(studentid: number): Promise<boolean> {
    const studentClassroom = await this.studentClassroomRepository.findOne({
      where: { student: { studentid } },
    });

    if (!studentClassroom) {
      throw new NotFoundException(
        `Student with ID ${studentid} not found in any classroom`
      );
    }

    await this.studentClassroomRepository.remove(studentClassroom);
    return true;
  }
}
