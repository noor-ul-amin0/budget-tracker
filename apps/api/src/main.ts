/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import errorHandler from './middlewares/errorHandler';
import AppError from './utils/AppError';
import routes from './routes';
import connectDB from './db';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

app.use('/api', routes);

//========================================================================================================================
// MIDDLEWARE FOR INVALID ROUTES
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server.`, 404));
});
app.use(errorHandler);

const port = process.env.PORT || 3333;
// Call the connectDB function to establish the database connection
connectDB();

const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
