import { Field, ObjectType } from "@nestjs/graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Student } from "../../student/entities/student.entity";

@ObjectType()
@Entity()
export class Prefix {
  @Field()
  @PrimaryGeneratedColumn()
  prefixid: number;

  @Field()
  @Column()
  prefixname: string;

  @OneToMany(() => Student, (student) => student.prefix)
  students: Student[];
}
