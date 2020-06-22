import fastify from 'fastify';

import fastifySwagger from 'fastify-swagger';

import { serviceConfig } from 'config';

import packageJson from '../../../package.json';

const register = (app: fastify.FastifyInstance): void => {
  app.register(fastifySwagger, {
    routePrefix: '/$wagger',
    exposeRoute: true,
    swagger: {
      info: {
        title: packageJson.description,
        description: 'Swagger API Documentation',
        version: packageJson.version,
      },
      schemes: [serviceConfig.url.match(/^(https|http)/)?.[0] || 'http'],
      consumes: ['application/json'],
      produces: ['application/json'],
      securityDefinitions: {
        baseAuth: {
          type: 'basic',
        },
      },
    },
  });
};

export default { register };
