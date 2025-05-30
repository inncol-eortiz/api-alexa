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
    const taskStrings = tasks.map((task) => task.title);
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

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return 
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const updatedTask = await Task.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: 'Error updating task' });
  }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return 
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};