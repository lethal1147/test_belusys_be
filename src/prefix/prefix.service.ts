import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Prefix } from "./entities/prefix.entity";
import { Repository } from "typeorm";

@Injectable()
export class PrefixService {
  constructor(
    @InjectRepository(Prefix)
    private prefixRepository: Repository<Prefix>
  ) {}

  async findAll(): Promise<Prefix[]> {
    const query = await this.prefixRepository.find();
    return query;
  }
}
