import { Args, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { StudentService } from "./student.service";
import { HttpExceptionFilter } from "src/utils/errorHandler";
import { UseFilters } from "@nestjs/common";
import { GetStudentResponse, Student } from "./entities/student.entity";
import { CreateStudentDto } from "./dto/createStudent.dto";
import { UpdateStudentDto } from "./dto/updateStudent.dto";

@Resolver()
@UseFilters(HttpExceptionFilter)
export class StudentResolver {
  constructor(private readonly studentService: StudentService) {}

  @Query(() => GetStudentResponse)
  async getAllstudents(
    @Args("studentid", { type: () => Number, nullable: true })
    studentid?: number,
    @Args("textSearch", { type: () => String, nullable: true })
    textSearch?: string,
    @Args("gradelevelid", { type: () => Number, nullable: true })
    gradelevelid?: number,
    @Args("page", { type: () => Int, nullable: true })
    page?: number,
    @Args("pageLimit", { type: () => Int, nullable: true })
    pageLimit?: number
  ): Promise<GetStudentResponse> {
    const filter = {
      studentid,
      textSearch,
      gradelevelid,
      page,
      pageLimit,
    };
    const { data, total } = await this.studentService.findAll(filter);
    return { data, total };
  }

  @Query(() => Student)
  async getOneStudent(
    @Args("studentid", { type: () => Number, nullable: true })
    studentid?: number
  ): Promise<Student> {
    return this.studentService.findOneStudentById(studentid);
  }

  @Mutation(() => Student)
  async createStudent(
    @Args("createStudentDto") createStudentDto: CreateStudentDto
  ): Promise<Student> {
    return this.studentService.createStudent(createStudentDto);
  }

  @Mutation(() => Student)
  async updateStudent(
    @Args("updateStudentDto") updateStudentDto: UpdateStudentDto
  ): Promise<Student> {
    return this.studentService.updateStudent(updateStudentDto);
  }

  @Mutation(() => Boolean)
  async deleteStudent(
    @Args("studentid", { type: () => Number }) studentid: number
  ): Promise<boolean> {
    return this.studentService.deleteStudent(studentid);
  }

  @Query(() => [Student])
  async getAllStudentDropdown(): Promise<Student[]> {
    return this.studentService.getAllDropdown();
  }

  @Mutation(() => Boolean)
  async addStudentToClassroom(
    @Args("studentid", { type: () => Number }) studentid: number,
    @Args("classroomid", { type: () => Number }) classroomid: number
  ): Promise<boolean> {
    return this.studentService.addStudentToClassroom(studentid, classroomid);
  }

  @Mutation(() => Boolean)
  async removeStudentFromClassroom(
    @Args("studentid", { type: () => Number }) studentid: number
  ): Promise<boolean> {
    return this.studentService.removeStudentFromClassroom(studentid);
  }
}
