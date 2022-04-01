import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Teacher } from '../entities/teacher.entity';
import SubjectSwagger from './subject.swagger';

class Subject extends SubjectSwagger {
  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}

export default class CreateTeacherSwagger extends OmitType(Teacher, [
  'subjects',
]) {
  @ApiProperty({ type: Subject, isArray: true })
  subjects: Subject[];
}
