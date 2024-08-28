import { UseFilters } from "@nestjs/common";
import { Query, Resolver } from "@nestjs/graphql";
import { HttpExceptionFilter } from "src/utils/errorHandler";
import { PrefixService } from "./prefix.service";
import { Prefix } from "./entities/prefix.entity";

@Resolver()
@UseFilters(HttpExceptionFilter)
export class PrefixResolver {
  constructor(private readonly prefixService: PrefixService) {}

  @Query(() => [Prefix])
  async getAllPrefix(): Promise<Prefix[]> {
    return await this.prefixService.findAll();
  }
}
