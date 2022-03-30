import { Subject } from '../../subject/entities/subject.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  lastname: string;

  @Column({ nullable: false, unique: true })
  cpf: string;

  @Column({ type: 'date', nullable: false })
  birthdate: Date;

  @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP(6)', select: false })
  createdAt: Date;

  @UpdateDateColumn({
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
    select: false,
  })
  updatedAt: Date;

  @OneToMany(() => Subject, (subject) => subject.teacher, {
    cascade: ['insert', 'update'],
  })
  subjects: Subject[];

  constructor(teacher?: Partial<Teacher>) {
    this.id = teacher?.id;
    this.name = teacher?.name;
    this.lastname = teacher?.lastname;
    this.cpf = teacher?.cpf;
    this.birthdate = teacher?.birthdate;
    this.createdAt = teacher?.createdAt;
    this.updatedAt = teacher?.updatedAt;
    this.subjects = teacher?.subjects;
  }
}
