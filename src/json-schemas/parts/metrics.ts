import { array, object, string } from '../primitives';

import { observations } from './observations';

export const metrics = array({
  minItems: 1,
  items: object({
    required: ['id', 'title', 'observations'],
    properties: {
      id: string(),
      title: string(),
      description: string(),
      observations,
    },
  }),
});
