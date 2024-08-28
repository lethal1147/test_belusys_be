import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Classroom } from "@classroom/entities/classroom.entity";
import { Student } from "../../student/entities/student.entity";

@ObjectType()
@Entity("student_classroom")
export class StudentClassroom {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  student_classroom_id: number;

  @Field(() => Student)
  @ManyToOne(() => Student, (student) => student.studentClassrooms)
  @JoinColumn({ name: "studentid" })
  student: Student;

  @Field(() => Classroom)
  @ManyToOne(() => Classroom, (classroom) => classroom.studentClassrooms, {
    onDelete: "CASCADE",
  })
  @JoinColumn({ name: "classroomid" })
  classroom: Classroom;
}
