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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GetTeachersSwagger } from './swagger/get-teachers.swagger';
import CreateTeacherSwagger from './swagger/create-teacher.swagger';
import { BadRequestSwagger } from 'src/helpers/swagger/bad-request-swagger';
import { NotFoundSwagger } from 'src/helpers/swagger/not-found-swagger';

@Controller('api/v1/teacher')
@ApiTags('teachers')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new teacher' })
  @ApiResponse({
    status: 201,
    description: 'Teacher created successfully',
    type: CreateTeacherSwagger,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  async create(@Body() createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    return this.teacherService.create(createTeacherDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all teachers' })
  @ApiResponse({
    status: 200,
    description: 'List of teachers',
    type: GetTeachersSwagger,
    isArray: true,
  })
  async findAll(): Promise<Teacher[]> {
    return await this.teacherService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a teacher by id' })
  @ApiResponse({
    status: 200,
    description: 'List teacher',
    type: GetTeachersSwagger,
    isArray: false,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Teacher not found',
    type: NotFoundSwagger,
  })
  async findOne(@Param('id') id: string): Promise<Teacher> {
    return await this.teacherService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a teacher' })
  @ApiResponse({ status: 200, description: 'Teacher updated successfully' })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestSwagger,
  })
  @ApiResponse({
    status: 404,
    description: 'Teacher not found',
    type: NotFoundSwagger,
  })
  async update(
    @Param('id') id: string,
    @Body() updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    return await this.teacherService.update(+id, updateTeacherDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a teacher' })
  @ApiResponse({ status: 204, description: 'Teacher deleted successfully' })
  @ApiResponse({
    status: 404,
    description: 'Teacher not found',
    type: NotFoundSwagger,
  })
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.teacherService.remove(+id);
  }
}
