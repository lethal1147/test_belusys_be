import { Field, Int, ObjectType } from "@nestjs/graphql";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";
import { StudentClassroom } from "../../studentClassroom/entities/studentClassroom.entity";
import { Gender } from "src/gender/entities/gender.entity";
import { GradeLevel } from "src/gradeLevel/entities/gradeLevel.entity";
import { Prefix } from "src/prefix/entities/prefix.entity";

@ObjectType()
@Entity()
export class Student {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  studentid: number;

  @Field()
  @Column()
  firstname: string;

  @Field()
  @Column()
  lastname: string;

  @Field()
  @Column()
  birthdate: Date;

  @ManyToOne(() => Gender, (gender) => gender.students)
  @JoinColumn({ name: "genderid" })
  @Field(() => Gender)
  gender: Gender;

  @ManyToOne(() => GradeLevel, (gradeLevel) => gradeLevel.students)
  @JoinColumn({ name: "gradelevelid" })
  @Field(() => GradeLevel)
  gradeLevel: GradeLevel;

  @ManyToOne(() => Prefix, (prefix) => prefix.students)
  @JoinColumn({ name: "prefixid" })
  @Field(() => Prefix)
  prefix: Prefix;

  @Field(() => [StudentClassroom])
  @OneToMany(
    () => StudentClassroom,
    (studentClassroom) => studentClassroom.student
  )
  studentClassrooms: StudentClassroom[];
}

@ObjectType()
export class GetStudentResponse {
  @Field(() => [Student])
  data: Student[];

  @Field(() => Int)
  total: number;
}
