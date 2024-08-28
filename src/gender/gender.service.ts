import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Gender } from "./entities/gender.entity";
import { Repository } from "typeorm";

@Injectable()
export class GenderService {
  constructor(
    @InjectRepository(Gender) private genderRepository: Repository<Gender>
  ) {}

  async findAll(): Promise<Gender[]> {
    const query = await this.genderRepository.find();
    return query;
  }
}
