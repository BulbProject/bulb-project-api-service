import { v4 as uuid } from 'uuid';

import { SpecificationModel } from 'models';
import type { Specification } from 'types/data';
import type { Criterion } from 'types/parts';

const add = async (categoryId: string, version: string, criteria: Criterion[]): Promise<{ id: string }> => {
  const specificationId = uuid();

  await new SpecificationModel({
    _id: specificationId,
    id: specificationId,
    categoryId,
    version,
    criteria,
  }).save();

  return {
    id: specificationId,
  };
};

const getOne = async (specificationId: string): Promise<Specification | null> => {
  return SpecificationModel.findOne(
    {
      _id: specificationId,
    },
    { _id: 0 }
  );
};

export default { add, getOne };
