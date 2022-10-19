import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { NotFoundError } from "rxjs"
import { PersonModule } from "src/models/person.model"
import { PersonSchema } from "src/schemas/person.shema"
import { Repository } from "typeorm"

@Controller('/person')
export class PersonController {
    constructor(@InjectRepository(PersonModule) private model: Repository<PersonModule>,
    ) { }
    @Post()
    public async create(@Body() body: PersonSchema,): Promise<{ data: PersonModule }> {
        const personCreatad = await this.model.save(body)
        return { data: personCreatad }
    }
    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id: number,
    ): Promise<{ data: PersonModule }> {
        const person = await this.model.findOne({ where: { id } });
        if (!person) {
            throw new NotFoundError(`Não achei uma pessoa com o id ${id}`);
        }
        return { data: person }
    }
    @Get()
    public async getAll(): Promise<{ data: PersonModule[] }> {
        const list = await this.model.find();
        return { data: list }
    }
    @Put(':id')
    public async update(@Param('id', ParseIntPipe) id: number, @Body() body: PersonSchema): Promise<{ data: PersonModule }> {
        const person = await this.model.findOne({ where: { id } });
        if (!person) {
            throw new NotFoundError(`Não achei uma pessoa com o id ${id}`);
        }

        await this.model.update({ id }, body);

        return { data: await this.model.findOne({ where: { id } }) }
    }

    @Delete(':id')
    public async delete(@Param('id', ParseIntPipe) id: number,
    ): Promise<{ data: string }> {
        const person = await this.model.findOne({ where: { id } });
        if (!person) {
            throw new NotFoundError(`Não achei uma pessoa com o id ${id}`);
        }
        await this.model.delete(id);
        return { data: `A pessoa com id ${id} foi deletada com sucesso` }
    }
}