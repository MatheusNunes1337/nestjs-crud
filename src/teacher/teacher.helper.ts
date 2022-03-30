import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subject } from '../subject/entities/subject.entity';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';

interface ISubject {
  name: string;
}

@Injectable()
export class TeacherHelper {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepo: Repository<Teacher>,
    @InjectRepository(Subject)
    private readonly subjectRepo: Repository<Subject>,
  ) {}

  async isCpfUnique(cpf: string): Promise<boolean> {
    const cpfExists = await this.teacherRepo.findOne({ where: { cpf } });
    if (cpfExists) return false;
    return true;
  }

  async isSubjectUnique(subject: ISubject): Promise<boolean> {
    const { name } = subject;
    const subjectExists = await this.subjectRepo.findOne({ where: { name } });
    if (subjectExists) return false;
    return true;
  }

  async teacherExists(teacherId: number): Promise<boolean> {
    const teacherExists = await this.teacherRepo.findOne({
      where: { id: teacherId },
    });

    if (!teacherExists) return false;
    return true;
  }
}
