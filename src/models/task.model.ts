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
      required: true,
    }
  },
  { timestamps: true }
);

TaskSchema.pre('save', async function(next) {
  if (this.isNew) {
    try {
      const maxTask = await Task.findOne().sort({ taskNumber: -1 });
      this.taskNumber = maxTask ? maxTask.taskNumber + 1 : 1;
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