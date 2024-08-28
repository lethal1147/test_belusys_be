import { InputType, Field, Int } from "@nestjs/graphql";

@InputType()
export class EditClassroomDto {
  @Field(() => Int)
  classroomid: number;

  @Field({ nullable: true })
  classname?: string;

  @Field({ nullable: true })
  academic_year?: string;

  @Field({ nullable: true })
  homeroom_teacher?: string;
}
