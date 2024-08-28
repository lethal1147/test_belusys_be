import { Field, ObjectType } from "@nestjs/graphql";
import { Student } from "@student/entities/student.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@ObjectType()
@Entity("gradelevel")
export class GradeLevel {
  @Field()
  @PrimaryGeneratedColumn()
  gradelevelid: number;

  @Field()
  @Column()
  levelName: string;

  @OneToMany(() => Student, (student) => student.gradeLevel)
  students: Student[];
}
