import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { Repository } from 'typeorm';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { Teacher } from './entities/teacher.entity';
import { TeacherHelper } from './teacher.helper';

@Injectable()
export class TeacherService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepository: Repository<Subject>,
    private readonly teacherHelper: TeacherHelper,
  ) {}

  async create(createTeacherDto: CreateTeacherDto): Promise<Teacher> {
    const { cpf } = createTeacherDto;
    const isCpfUnique = await this.teacherHelper.isCpfUnique(cpf);
    if (!isCpfUnique) throw new ConflictException(`CPF ${cpf} already in use`);

    const { subjects } = createTeacherDto;
    await Promise.all(
      subjects.map(async (subject) => {
        const isSubjectUnique = await this.teacherHelper.isSubjectUnique(
          subject,
        );
        if (!isSubjectUnique)
          throw new ConflictException(
            `it seems that the ${subject.name} subject is already being taught by another teacher `,
          );
      }),
    );

    return this.teacherRepository.save(createTeacherDto);
  }

  findAll(): Promise<Teacher[]> {
    return this.teacherRepository.find({ relations: ['subjects'] });
  }

  async findOne(id: number): Promise<Teacher> {
    const teacher = await this.teacherRepository.findOne(
      { id },
      { relations: ['subjects'] },
    );
    if (!teacher) throw new NotFoundException('Teacher not found');

    return teacher;
  }

  async update(
    id: number,
    updateTeacherDto: UpdateTeacherDto,
  ): Promise<Teacher> {
    const teacherExists = await this.teacherHelper.teacherExists(id);
    if (!teacherExists) throw new NotFoundException('Teacher not found');

    const { cpf } = updateTeacherDto;
    const isCpfUnique = await this.teacherHelper.isCpfUnique(cpf);
    if (!isCpfUnique) throw new ConflictException(`CPF ${cpf} already in use`);

    const { subjects } = updateTeacherDto;

    if (subjects) {
      await Promise.all(
        subjects.map(async (subject) => {
          const isSubjectUnique = await this.teacherHelper.isSubjectUnique(
            subject,
          );
          if (!isSubjectUnique)
            throw new ConflictException(
              `it seems that the ${subject.name} subject is already being taught by another teacher `,
            );
        }),
      );
    }

    const updatedTeacher = await this.teacherRepository.save({
      id,
      ...updateTeacherDto,
    });

    await this.subjectRepository
      .createQueryBuilder()
      .delete()
      .from(Subject)
      .where('teacherId IS NULL')
      .execute();

    return updatedTeacher;
  }

  async remove(id: number) {
    const teacherExists = await this.teacherHelper.teacherExists(id);
    if (!teacherExists) throw new NotFoundException('Teacher not found');

    return this.teacherRepository.delete(id);
  }
}
