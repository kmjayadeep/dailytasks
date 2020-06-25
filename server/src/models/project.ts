import mongoose from 'mongoose';

export interface ITask {
  name: string;
  done?: boolean;
  description: string;
  date: Date;
}

export interface IProject extends mongoose.Document {
  name: string;
  user: string;
  tasks: Array<ITask>;
  archived: boolean;
}

export const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: String },
  tasks: [
    {
      done: {
        type: Boolean,
        default: false,
      },
      date: {
        type: Date,
      },
      name: {
        type: String,
        required: true,
      },
      description: String,
    },
  ],
  archived: { type: Boolean, default: false },
});

const Model = mongoose.model<IProject>('Project', projectSchema);

export const addTaskToProject = async (projectId: string, task: ITask) => {
  const project = await Model.findOneAndUpdate(
    {
      _id: projectId,
    },
    {
      $push: {
        tasks: task,
      },
    },
    { new: true }
  );

  return project;
};

export default Model;
