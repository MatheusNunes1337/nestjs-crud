import { Teacher } from '../../teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Subject {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ unique: true })
  @ApiProperty()
  name: string;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', select: false })
  @ApiProperty()
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  @ApiProperty()
  updatedAt: Date;

  @ManyToOne(() => Teacher, (teacher) => teacher.subjects, {
    onDelete: 'CASCADE',
  })
  @ApiProperty()
  teacher: Teacher;
}
