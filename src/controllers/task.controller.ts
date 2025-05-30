import { Request, Response } from 'express';
import { Task } from '../models/task.model';

export const getTask = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching tasks' });
  }
};

export const getTaskStrings = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find();
    const taskStrings = tasks.map((task) => task.title); // solo título
    res.json(taskStrings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task strings' });
  }
};

export const createTask = async (req: Request, res: Response) => {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'Error creating task' });
  }
};
