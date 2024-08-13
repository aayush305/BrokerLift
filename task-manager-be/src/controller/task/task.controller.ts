import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';
import { CreateTaskDto } from 'src/dto/CreateTaskDto';
import { UpdateTaskDto } from 'src/dto/UpdateTaskDto';
import { ITask } from 'src/interface/task.interface';
import { TaskService } from 'src/service/task/task.service';

@Controller('task')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getTasksList(@Res() res: Response<ITask[]>) {
    try {
      const taskList = await this.taskService.getTasksList();
      return res.status(HttpStatus.OK).json(taskList);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Get('/:id')
  async getTaskById(@Res() res: Response<ITask>, @Param('id') id: string) {
    try {
      const task = await this.taskService.getTaskById(id);
      return res.status(HttpStatus.OK).json(task);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Post()
  async addTask(
    @Res() res: Response<ITask[]>,
    @Body() createTaskDto: CreateTaskDto,
  ) {
    try {
      const newTask = await this.taskService.addTask(createTaskDto);
      return res.status(HttpStatus.OK).json(newTask);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }

  @Patch('/:id')
  async updateTask(
    @Res() res: Response<ITask[]>,
    @Body() updateTaskDto: UpdateTaskDto,
    @Param('id') id: string,
  ) {
    try {
      const updatedTask = await this.taskService.updateTask(id, updateTaskDto);
      return res.status(HttpStatus.OK).json(updatedTask);
    } catch (error) {
      return res.status(error.status).json(error.response);
    }
  }
}
