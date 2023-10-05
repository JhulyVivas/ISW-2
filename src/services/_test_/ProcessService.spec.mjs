import {
  describe, test, expect, jest,
} from '@jest/globals';
import ProcessRepository from '../../repositories/ProcessRepository.mjs';
import MinioService from '../MinioService.mjs';
import ProcessService from '../ProcessService.mjs';

const suma = (a, b) => a + b;

describe('Test suma', () => {
  test('suma 1 + 2 = 3', () => {
    expect(suma(1, 2)).toBe(3);
  });

  test('suma 1 + 3 = 4', () => {
    expect(suma(1, 3)).toBe(4);
  });
});

describe('ProcessService test', () => {
  const processRepository = new ProcessRepository();

  const minioService = new MinioService();

  const processService = new ProcessService({ minioService, processRepository });

  test('Test applyFilters function with invalid payoad', () => {
    expect(processService.applyFilters()).rejects.toThrow();
    expect(processService.applyFilters({})).rejects.toThrow();
    expect(processService.applyFilters({ filters: [] })).rejects.toThrow();
  });
  test('Test applyFilters function with valid payload', async () => {
    const payload = {
      filters: ['negative'],
      images: [{ originalname: 'image1.png', buffer: Buffer.from('') }],
    };
    const expectedProcess = {
      id: '1234',
      filters: payload.filters,
      images: payload.images,
    };

    processRepository.save = jest.fn()
      .mockImplementationOnce(() => expectedProcess);

    minioService.saveImage = jest.fn()
      .mockImplementationOnce(() => Promise.resolve('image1.png'));

    const process = await processService.applyFilters(payload);

    expect(process).toMatchObject(expectedProcess);
  });
});
