import { ApiProperty } from '@nestjs/swagger';

export default class SubjectSwagger {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;
}
