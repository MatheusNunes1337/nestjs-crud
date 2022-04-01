import { Subject } from '../../subject/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column({ nullable: false })
  @ApiProperty()
  name: string;

  @Column({ nullable: false })
  @ApiProperty()
  lastname: string;

  @Column({ nullable: false, unique: true })
  @ApiProperty()
  cpf: string;

  @Column({ type: 'date', nullable: false })
  @ApiProperty()
  birthdate: Date;

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

  @ApiProperty()
  @OneToMany(() => Subject, (subject) => subject.teacher, {
    cascade: ['insert', 'update'],
  })
  @ApiProperty()
  subjects: Subject[];
}
