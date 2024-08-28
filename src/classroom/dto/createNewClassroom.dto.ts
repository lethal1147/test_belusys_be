import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class CreateClassroomDto {
  @Field()
  classname: string;

  @Field()
  academic_year: string;

  @Field()
  homeroom_teacher: string;
}
