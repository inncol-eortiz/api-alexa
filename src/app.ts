import express from 'express';
import taskRouter from './routes/task.routes';
import { connectDB } from './config/db';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/tasks', taskRouter);

app.use('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

connectDB();

export default app;
