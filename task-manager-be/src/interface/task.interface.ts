import { Document } from 'mongoose';

export interface ITask extends Document {
  readonly task: string;
  readonly completed: boolean;
}
