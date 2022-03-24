import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from 'src/subject/entities/subject.entity';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

@Injectable()
export class TeacherHelper {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async isCpfUnique(cpf: string): Promise<boolean> {
    const cpfExists = await this.teacherRepo.findOne({ cpf });
    if (cpfExists) return false;
    else true;
  }
}
