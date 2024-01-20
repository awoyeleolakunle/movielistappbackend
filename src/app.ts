import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import movieRouter from './routes/movieRoutes';


const app: Application = express();

app.use(bodyParser.json());


const hello = (req: Request, res: Response) => {
  return res.send('Hello, world!');
};



const mongoUrl = "mongodb://127.0.0.1:27017/moviedb";
mongoose.Promise = global.Promise;


 mongoose.connect(mongoUrl, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
 } as any);


 const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");})





app.use('/api/v1/movielistapp/', movieRouter);
app.use('/api/v1/movielistapp', hello);


app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Server Error');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});






