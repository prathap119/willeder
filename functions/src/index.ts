import dotenv from 'dotenv';
dotenv.config();

import * as functions from 'firebase-functions/v1';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { registerComponents } from './components';
import { errorHandler } from './middlewares/errorHandler';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const app = express();

const COOKIE_SECRET = process.env.COOKIE_SECRET as string;

app.use(cors());
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET));
app.use(express.urlencoded({ extended: true }));
const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Willeder',
        version: '1.0.0',
        description: 'Documentation for your Express API',
      },
      servers: [
        {
          url: 'http://127.0.0.1:5001/willeder-23ed0/asia-northeast1/api', // Update with your actual URL
        },
      ],
    },
    apis: ['./components/*.ts'], // Update with the path to your route files
  };
  const swaggerSpec = swaggerJsdoc(swaggerOptions);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
registerComponents(app);

errorHandler(app);
export default app;
module.exports.api = functions.region('asia-northeast1').https.onRequest(app);
