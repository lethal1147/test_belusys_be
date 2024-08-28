import { UseFilters } from "@nestjs/common";
import { Resolver, Query, Args, Mutation, Int } from "@nestjs/graphql";
import { ClassroomService } from "@classroom/classroom.service";
import { HttpExceptionFilter } from "src/utils/errorHandler";
import { Classroom } from "./entities/classroom.entity";
import { CreateClassroomDto } from "./dto/createNewClassroom.dto";
import { EditClassroomDto } from "./dto/editClassroom.dto";

@Resolver()
@UseFilters(HttpExceptionFilter)
export class ClassroomResolver {
  constructor(private readonly classroomService: ClassroomService) {}

  @Query(() => [Classroom])
  async getAllClassroom(): Promise<Classroom[]> {
    return this.classroomService.findAllClassroom();
  }

  @Query(() => [Classroom])
  async getAllClassroomWithStudent(
    @Args("classroomid", { type: () => Number, nullable: true })
    classroomid?: number,
    @Args("classname", { type: () => String, nullable: true })
    classname?: string,
    @Args("homeroomTeacher", { type: () => String, nullable: true })
    homeroomTeacher?: string
  ): Promise<Classroom[]> {
    const filter = {
      classroomid,
      classname,
      homeroomTeacher,
    };
    return this.classroomService.findAllClassroomWithStudents(filter);
  }

  @Query(() => Classroom)
  async getOneClassroom(
    @Args("classroomid", { type: () => Number }) classroomid: number
  ): Promise<Classroom> {
    return this.classroomService.getOneClassroom(classroomid);
  }

  @Mutation(() => Classroom)
  async createNewClassroom(
    @Args("createClassroomDto") createClassroomDto: CreateClassroomDto
  ): Promise<Classroom> {
    return this.classroomService.createNewClassroom(createClassroomDto);
  }

  @Mutation(() => Classroom)
  async editClassroom(
    @Args("editClassroomDto") editClassroomDto: EditClassroomDto
  ): Promise<Classroom> {
    return this.classroomService.editClassroom(editClassroomDto);
  }

  @Mutation(() => Boolean)
  async deleteClassroom(
    @Args("classroomid", { type: () => Int }) classroomid: number
  ): Promise<boolean> {
    return this.classroomService.deleteClassroom(classroomid);
  }
}
