import { UseFilters } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { HttpExceptionFilter } from "src/utils/errorHandler";
import { GradeLevelService } from "./gradeLevel.service";
import { GradeLevel } from "./entities/gradeLevel.entity";

@Resolver()
@UseFilters(HttpExceptionFilter)
export class GradeLevelResolver {
  constructor(private readonly gradeLevelService: GradeLevelService) {}

  @Query(() => [GradeLevel])
  async getAllGradeLevel(): Promise<GradeLevel[]> {
    return await this.gradeLevelService.findAll();
  }
}
