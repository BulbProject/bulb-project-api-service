import { specifications } from 'lib/db/methods';
import { connectToDb } from 'lib/db';

import logger from 'lib/logger';

import { category } from 'mocks';

import SpecificationCleaner from './specification-cleaner.service';

jest.mock('lib/logger');
jest.useFakeTimers();

describe('SpecificationCleaner', () => {
  let sut: SpecificationCleaner;
  let specificationId: string;

  describe('Cleaning outdated specifications', () => {
    beforeEach(async () => {
      await connectToDb();

      const { id } = await specifications.add('31500000-1', 'v2', category.criteria);
      specificationId = id;

      sut = SpecificationCleaner.create({
        runInterval: 1,
        deleteThreshold: 1,
      });

      await sut.clean('millisecond');
    });

    it('Should clean oudated specification', async () => {
      expect(await specifications.getOne(specificationId)).toBe(null);
    });

    it('Should log count of deleted specifications', async () => {
      expect(logger.info).toHaveBeenLastCalledWith(`SpecificationCleaner has deleted 1 outdated specifications.`);
    });
  });
});
