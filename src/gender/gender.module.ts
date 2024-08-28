import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Gender } from "./entities/gender.entity";
import { GenderResolver } from "./gender.resolver";
import { GenderService } from "./gender.service";

@Module({
  imports: [TypeOrmModule.forFeature([Gender])],
  providers: [GenderResolver, GenderService],
  controllers: [],
})
export class GenderModule {}
