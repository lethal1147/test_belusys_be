import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateStudentDto {
  @Field(() => String)
  firstname: string;

  @Field(() => String)
  lastname: string;

  @Field()
  birthdate: Date;

  @Field(() => Int)
  prefixid: number;

  @Field(() => Int)
  genderid: number;

  @Field(() => Int)
  gradelevelid: number;

  @Field(() => Int)
  classroomid: number;
}
