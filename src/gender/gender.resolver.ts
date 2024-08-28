import { UseFilters } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { HttpExceptionFilter } from "src/utils/errorHandler";
import { GenderService } from "./gender.service";
import { Gender } from "./entities/gender.entity";

@Resolver()
@UseFilters(HttpExceptionFilter)
export class GenderResolver {
  constructor(private readonly genderService: GenderService) {}

  @Query(() => [Gender])
  async getAllGender(): Promise<Gender[]> {
    return await this.genderService.findAll();
  }
}
