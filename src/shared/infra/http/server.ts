/* eslint-disable no-console */
import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';
import routes from '@shared/infra/http/routes';
import '@shared/infra/typeorm';
import upload from '@config/upload';
import AppError from '@shared/errors/AppError';
import '@shared/container';

const app = express();
app.use(cors());
app.use(express.json());
app.use('/files', express.static(upload.uploadFolder));
app.use(routes);
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  return res
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error' });
});

app.listen(7000, () => console.log('Server running on port 7000'));