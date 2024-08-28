import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateStudentDto {
  @Field(() => Int)
  studentid: number;

  @Field({ nullable: true })
  firstname?: string;

  @Field({ nullable: true })
  lastname?: string;

  @Field({ nullable: true })
  birthdate?: Date;

  @Field(() => Int, { nullable: true })
  prefixid?: number;

  @Field(() => Int, { nullable: true })
  genderid?: number;

  @Field(() => Int, { nullable: true })
  gradelevelid?: number;

  @Field(() => Int, { nullable: true })
  classroomid?: number;
}
