import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  Query,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { SearchTeacherDto } from './dto/search-teacher.dto';

@Controller('api/v1/teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return await this.teacherService.create(createTeacherDto);
  }

  @Get()
  async findAll(@Query() query: SearchTeacherDto): Promise<Teacher[]> {
    return await this.teacherService.findAll(query);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return await this.teacherService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return await this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
