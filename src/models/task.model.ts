import { Schema, model } from 'mongoose';

const TaskSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
    taskNumber: {
      type: Number,
      unique: true,
      // Quitamos required: true ya que será generado automáticamente
    }
  },
  { timestamps: true }
);

TaskSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      // Si no tiene taskNumber asignado, buscamos el máximo y asignamos el siguiente
      if (!this.taskNumber) {
        const maxTask = await Task.findOne().sort({ taskNumber: -1 });
        
        // Fix: Add null/undefined check for maxTask and maxTask.taskNumber
        this.taskNumber = maxTask && maxTask.taskNumber ? maxTask.taskNumber + 1 : 1;
      }
      next();
    } catch (error) {
      if (error instanceof Error) {
        next(error);
      }
    }
  } else {
    next();
  }
});

export const Task = model('Task', TaskSchema);