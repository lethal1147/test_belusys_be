import { Field, ObjectType } from "@nestjs/graphql";
import { Student } from "@student/entities/student.entity";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";

@ObjectType()
@Entity("gender")
export class Gender {
  @Field()
  @PrimaryGeneratedColumn()
  genderid: number;

  @Field()
  @Column()
  gendername: string;

  @OneToMany(() => Student, (student) => student.gender)
  students: Student[];
}
