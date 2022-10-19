import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";
import { PersonController } from "src/controllers/person.controller";

@Module({
    imports: [TypeOrmModule.forFeature([PersonModule])],
    controllers: [PersonController],
})
export class PersonModule { }