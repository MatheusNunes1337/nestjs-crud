import { ApiProperty, OmitType } from '@nestjs/swagger';
import { Teacher } from '../entities/teacher.entity';
import SubjectSwagger from './subject.swagger';

export class GetTeachersSwagger extends OmitType(Teacher, [
  'createdAt',
  'updatedAt',
  'subjects',
]) {
  @ApiProperty({ type: SubjectSwagger, isArray: true })
  subjects: SubjectSwagger[];
}
