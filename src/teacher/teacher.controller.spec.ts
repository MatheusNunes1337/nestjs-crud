import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

describe('TeacherController', () => {
  let teacherController: TeacherController;
  let teacherService: TeacherService;

  const mockTeacherService = {
    create: jest.fn((dto) => {
      return Promise.resolve({
        ...dto,
        id: Math.random(),
        createdAt: 'any_date',
        updatedAt: 'any_date',
      });
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

  it('should update a teacher name', async () => {
    const updateTeacherDto = { name: 'any_name' };
    expect(await teacherController.update('1', updateTeacherDto)).toEqual({
      id: 1,
      ...updateTeacherDto,
      updatedAt: expect.any(String),
    });
  });
});
