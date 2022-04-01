import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

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

describe('Given the TeacherController', () => {
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
    findAll: jest.fn().mockResolvedValue([
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
    ]),
    findOne: jest.fn((id) => {
      return Promise.resolve({
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
    update: jest.fn((id, dto) => {
      return Promise.resolve({
        id,
        ...dto,
        updatedAt: 'any_date',
      });
    }),
    remove: jest.fn((id) => {
      return Promise.resolve({});
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeacherController],
      providers: [
        {
          provide: TeacherService,
          useValue: mockTeacherService,
        },
      ],
    }).compile();

    teacherController = module.get<TeacherController>(TeacherController);
    teacherService = module.get<TeacherService>(TeacherService);
  });

  it('expects teacher controller and teacher service to be defined', () => {
    expect(teacherController).toBeDefined();
    expect(teacherService).toBeDefined();
  });

  describe('when the create method is called with a valid body', () => {
    test('then it expects to create a teacher', async () => {
      const result = await teacherController.create(createTeacherDto);

      expect(result).toEqual({
        ...createTeacherDto,
        id: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });

      expect(mockTeacherService.create).toHaveBeenCalledWith(createTeacherDto);
    });
  });

  describe('when the create method is called with a a body that has a cpf that already exists', () => {
    test('then it expects to throw a conflict exception', async () => {
      jest
        .spyOn(teacherService, 'create')
        .mockRejectedValueOnce(new ConflictException());

      await expect(teacherController.create(createTeacherDto)).rejects.toThrow(
        ConflictException,
      );

      expect(teacherService.create).toHaveBeenCalledWith(createTeacherDto);
    });
  });

  describe('When the update method is called with a valid body and it that exists', () => {
    test('then it expects to update a teacher', async () => {
      const updateTeacherDto = { name: 'any_name' };
      const result = await teacherController.update('1', updateTeacherDto);

      expect(result).toEqual({
        id: 1,
        ...updateTeacherDto,
        updatedAt: expect.any(String),
      });

      expect(teacherService.update).toHaveBeenCalledWith(1, updateTeacherDto);
    });
  });

  describe('When the update method is called with a valid body but id that not exists', () => {
    test('then it expects to throw a not found exception', async () => {
      const updateTeacherDto = { name: 'any_name' };

      jest
        .spyOn(teacherService, 'update')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(
        teacherController.update('10', updateTeacherDto),
      ).rejects.toThrow(NotFoundException);

      expect(teacherService.update).toHaveBeenCalledWith(10, updateTeacherDto);
    });
  });

  describe('When the update method is called with a body that has a cpf value that already exists', () => {
    test('then it expects to throw a conflict exception', async () => {
      const updateTeacherDto = { cpf: 'any_cpf' };

      jest
        .spyOn(teacherService, 'update')
        .mockRejectedValueOnce(new ConflictException());

      await expect(
        teacherController.update('1', updateTeacherDto),
      ).rejects.toThrow(ConflictException);

      expect(teacherService.update).toHaveBeenCalledWith(1, updateTeacherDto);
    });
  });

  describe('When the find all method is called', () => {
    test('then it expects to list all teachers', async () => {
      const result = await teacherController.findAll();

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

      expect(teacherService.findAll).toHaveBeenCalled();
    });
  });

  describe('When the find one mathod is called if a id that exists', () => {
    test('then it expects to return a teacher', async () => {
      const result = await teacherController.findOne('2');

      expect(result).toEqual({
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

      expect(teacherService.findOne).toHaveBeenCalledWith(2);
    });
  });

  describe('When the find one method is called with a id that not exists', () => {
    test('then it expects to throw a not found exception', async () => {
      jest
        .spyOn(teacherService, 'findOne')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(teacherController.findOne('50')).rejects.toThrow(
        NotFoundException,
      );

      expect(teacherService.findOne).toHaveBeenCalledWith(50);
    });
  });

  describe('When the remove method is called with a id that exists', () => {
    test('then it expects to delete a teacher', async () => {
      await teacherController.remove('1');

      expect(teacherService.remove).toHaveBeenCalledWith(1);
    });
  });

  describe('When the remove method is called with a id that not exists', () => {
    test('then it expects to throw a not found exception', async () => {
      jest
        .spyOn(teacherService, 'remove')
        .mockRejectedValueOnce(new NotFoundException());

      await expect(teacherController.remove('45')).rejects.toThrow(
        NotFoundException,
      );

      expect(teacherService.remove).toHaveBeenCalledWith(45);
    });
  });
});
