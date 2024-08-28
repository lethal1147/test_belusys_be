import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { StudentClassroom } from "../../studentClassroom/entities/studentClassroom.entity";
import { Student } from "@student/entities/student.entity";

@ObjectType()
@Entity("classroom")
export class Classroom {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  classroomid: number;

  @Field()
  @Column()
  classname: string;

  @Field()
  @Column()
  academic_year: string;

  @Field()
  @Column()
  homeroom_teacher: string;

  @OneToMany(
    () => StudentClassroom,
    (StudentClassroom) => StudentClassroom.classroom,
    { eager: true }
  )
  studentClassrooms: StudentClassroom[];

  @Field(() => [Student], { nullable: true })
  get students(): Student[] {
    return this.studentClassrooms
      ? this.studentClassrooms.map((studentClass) => studentClass.student)
      : [];
  }
}
