import { Request, Response } from 'express';
import { Task } from '../models/task.model';

// Mantener los controladores existentes
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

// Mantener el método original y agregar método de búsqueda por taskNumber
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

// Nuevo método para buscar por taskNumber (útil para Alexa)
export const getTaskByNumber = async (req: Request, res: Response): Promise<void> => {
  try {
    const { number } = req.params;
    const taskNumber = parseInt(number);
    
    if (isNaN(taskNumber)) {
      res.status(400).json({ message: 'Invalid task number' });
      return;
    }
    
    const task = await Task.findOne({ taskNumber });
    
    if (!task) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching task' });
  }
};

// Actualizar también para permitir actualización por taskNumber
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Si el id es numérico, buscar por taskNumber
    if (!isNaN(parseInt(id))) {
      const taskNumber = parseInt(id);
      const updatedTask = await Task.findOneAndUpdate(
        { taskNumber }, 
        req.body, 
        { new: true, runValidators: true }
      );
      
      if (!updatedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      
      res.json(updatedTask);
      return;
    }

    // Si no es numérico, buscar por MongoDB ID
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

// Actualizar también para permitir eliminación por taskNumber
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    // Si el id es numérico, buscar por taskNumber
    if (!isNaN(parseInt(id))) {
      const taskNumber = parseInt(id);
      const deletedTask = await Task.findOneAndDelete({ taskNumber });
      
      if (!deletedTask) {
        res.status(404).json({ message: 'Task not found' });
        return;
      }
      
      res.json({ message: 'Task deleted successfully' });
      return;
    }

    // Si no es numérico, buscar por MongoDB ID
    const deletedTask = await Task.findByIdAndDelete(id);
    
    if (!deletedTask) {
      res.status(404).json({ message: 'Task not found' });
      return;
    }
    
    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting task' });
  }
};