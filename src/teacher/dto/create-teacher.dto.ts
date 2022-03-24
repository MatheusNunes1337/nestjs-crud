import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsArray,
  ArrayUnique,
} from 'class-validator';

interface Subject {
  name: string;
}

export class CreateTeacherDto {
  @IsString()
  @Length(3, 15)
  @IsNotEmpty()
  name: string;

  @IsString()
  @Length(3, 15)
  @IsNotEmpty()
  lastname: string;

  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
  @IsNotEmpty()
  cpf: string;

  @IsDateString()
  birthdate: Date;

  @IsArray()
  @ArrayUnique()
  subjects: Subject[];
}
