import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Prefix } from "./entities/prefix.entity";
import { PrefixResolver } from "./prefix.resolver";
import { PrefixService } from "./prefix.service";

@Module({
  imports: [TypeOrmModule.forFeature([Prefix])],
  providers: [PrefixResolver, PrefixService],
  controllers: [],
})
export class PrefixModule {}
