import { InjectRepository } from "@nestjs/typeorm";
import { GradeLevel } from "./entities/gradeLevel.entity";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";

@Injectable()
export class GradeLevelService {
  constructor(
    @InjectRepository(GradeLevel)
    private gradeLevelRepository: Repository<GradeLevel>
  ) {}

  async findAll(): Promise<GradeLevel[]> {
    const query = await this.gradeLevelRepository.find();
    return query;
  }
}
