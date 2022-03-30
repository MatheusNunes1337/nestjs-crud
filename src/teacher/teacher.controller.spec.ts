import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

describe('TeacherController', () => {
  let teacherController: TeacherController;

  const mockTeacherService = {
    create: jest.fn((dto) => {
      return Promise.resolve({
        ...dto,
        id: Math.random(),
        createdAt: 'any_date',
        updatedAt: 'any_date',
      });
    }),
    findAll: jest.fn(() => {
      const teachers = [
        {
          id: Math.floor(Math.random() * 6) + 1,
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
        },
      ];
      return teachers;
    }),
    findOne: jest.fn((id) => {
      return {
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
      };
    }),
    update: jest.fn((id, dto) => {
      return {
        id,
        ...dto,
        updatedAt: 'any_date',
      };
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [TeacherService],
    })
      .overrideProvider(TeacherService)
      .useValue(mockTeacherService)
      .compile();

    teacherController = module.get<TeacherController>(TeacherController);
  });

  it('should be defined', () => {
    expect(teacherController).toBeDefined();
  });

  it('should create a teacher', async () => {
    const createTeacherDto = {
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
    expect(await teacherController.create(createTeacherDto)).toEqual({
      ...createTeacherDto,
      id: expect.any(Number),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
    });

    expect(mockTeacherService.create).toHaveBeenCalledWith(createTeacherDto);
  });

  it('should update teacher name', async () => {
    const updateTeacherDto = { name: 'any_name' };
    expect(await teacherController.update('1', updateTeacherDto)).toEqual({
      id: 1,
      ...updateTeacherDto,
      updatedAt: expect.any(String),
    });

    expect(mockTeacherService.update).toHaveBeenCalled();
  });

  it('should get all teachers', async () => {
    expect(await teacherController.findAll()).toEqual([
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

    expect(mockTeacherService.findAll).toHaveBeenCalled();
  });

  it('should find a teacher by id', async () => {
    expect(await teacherController.findOne('2')).toEqual({
      id: 2,
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
    });

    expect(mockTeacherService.findOne).toHaveBeenCalled();
  });
});
