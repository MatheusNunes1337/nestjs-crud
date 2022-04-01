import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherService } from './teacher.service';

const teacher = {
  name: 'any_name',
  lastname: 'any_lastname',
  cpf: 'any_cpf',
  birthdate: new Date(),
  subjects: [
    {
      name: 'any_subject',
    },
  ],
};

describe('Given the TeacherService', () => {
  let teacherService: TeacherService;
  let teacherRepository: Repository<Teacher>;

  const mockTeacherRepository = {
    save: jest.fn().mockImplementation((teacher) =>
      Promise.resolve({
        id: Math.random(),
        ...teacher,
      }),
    ),
    find: jest.fn().mockImplementation(() => {
      Promise.resolve([
        {
          id: Math.random(),
          ...teacher,
        },
      ]);
    }),
    findOne: jest.fn().mockImplementation((id) => {
      Promise.resolve({
        id,
        name: 'any_name',
        lastname: 'any_lastname',
        cpf: 'any_cpf',
        birthdate: 'any_date',
        subjects: [
          {
            id: Math.random(),
            name: 'any_subject',
          },
        ],
      });
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeacherService,
        {
          provide: getRepositoryToken(Teacher),
          useValue: mockTeacherRepository,
        },
      ],
    }).compile();

    teacherService = module.get<TeacherService>(TeacherService);
    teacherRepository = module.get<Repository<Teacher>>(
      getRepositoryToken(Teacher),
    );
  });

  it('should be defined', () => {
    expect(teacherService).toBeDefined();
    expect(teacherRepository).toBeDefined();
  });

  describe('When the create method is called with valid body', () => {
    test('then it expects to create a new teacher', async () => {
      const result = await teacherService.create(teacher);

      expect(result).toEqual({
        id: expect.any(Number),
        ...teacher,
      });

      expect(teacherRepository.save).toHaveBeenCalledWith(teacher);
    });
  });

  describe('When the find method is called', () => {
    test('then it expects to return a list of all teachers', async () => {
      const result = await teacherService.findAll();

      expect(result).toEqual([
        expect.objectContaining({
          id: expect.any(Number),
          name: expect.any(String),
          lastname: expect.any(String),
          cpf: expect.any(String),
          birthdate: expect.any(String),
          subjects: expect.arrayContaining([
            expect.objectContaining({
              id: expect.any(Number),
              name: expect.any(String),
            }),
          ]),
        }),
      ]);

      expect(teacherRepository.save).toHaveBeenCalledWith(teacher);
    });
  });
});
