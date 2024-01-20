import express, { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import movieRouter from './routes/movieRoutes';

import connectToDatabase from '../src/db/db';


const app: Application = express();

app.use(bodyParser.json());

const PAGE_NOT_FOUND = (req: Request, res: Response) => {
  return res.send('Page cannot be found');
};


connectToDatabase();


app.use('/api/v1/movielistapp/', movieRouter);
app.use('/api/v1/movielistapp', PAGE_NOT_FOUND);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






