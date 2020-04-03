import fastify from 'fastify';

import { postCategory, putCategory } from 'controllers/manage';
import { category } from 'json-schemas';
import handleAuthorization from './authorization';

const tags = ['Manage'];
const params = {
  categoryId: {
    type: 'string',
    description: 'Category ID',
  },
};
const security = [{ baseAuth: [] }];

export const manageRoute = (app: fastify.FastifyInstance): void => {
  app.post(
    '/manage/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        security,
        summary: 'Adding of category',
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              version: {
                type: 'string',
              },
            },
          },
          400: {
            type: 'string',
            example: ['Path parameter <categoryId> is missing', 'Path parameter categoryId is not equal to body.id'],
          },
        },
      },
    },
    postCategory
  );

  app.put(
    '/manage/categories/:categoryId',
    {
      onRequest: handleAuthorization,
      schema: {
        tags,
        security,
        summary: 'Updating of category',
        params: {
          categoryId: params.categoryId,
        },
        body: category,
        response: {
          200: {
            type: 'object',
            properties: {
              id: {
                type: 'string',
              },
              version: {
                type: 'string',
              },
            },
          },
          400: {
            type: 'string',
            example: [
              'Category with id <categoryId> not found and can`t update',
              'Path parameter categoryId is not equal to body.id',
            ],
          },
        },
      },
    },
    putCategory
  );
};
