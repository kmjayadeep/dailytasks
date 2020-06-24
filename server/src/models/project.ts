import mongoose from 'mongoose';

export interface ITask {
  name: string,
  done: boolean,
  date: Date,
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
    },
  ],
  archived: { type: Boolean, default: false },
});

const Model = mongoose.model<IProject>('Project', projectSchema);
export default Model;
