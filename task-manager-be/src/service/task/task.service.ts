import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTaskDto } from 'src/dto/CreateTaskDto';
import { UpdateTaskDto } from 'src/dto/UpdateTaskDto';
import { ITask } from 'src/interface/task.interface';

@Injectable()
export class TaskService {
  constructor(@InjectModel('tasks') private taskModel: Model<ITask>) {}

  async getTaskById(taskID: string): Promise<ITask> {
    const task = await this.taskModel.findById(taskID).exec();
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return task;
  }

  async getTasksList(): Promise<ITask[]> {
    const taskList = await this.taskModel.find().exec();
    if (!taskList || taskList.length === 0) {
      throw new NotFoundException('No task found');
    }
    return taskList;
  }

  async addTask(task: CreateTaskDto): Promise<ITask[]> {
    const newTask = new this.taskModel(task);
    await newTask.save();
    return this.getTasksList();
  }

  async updateTask(taskID: string, task: UpdateTaskDto): Promise<ITask[]> {
    await this.taskModel.findByIdAndUpdate(taskID, task, {
      new: true,
    });
    if (!task) {
      throw new NotFoundException('Task not found');
    }
    return this.getTasksList();
  }
}
