import { NextFunction, Request, Response } from 'express';
import taskService from '../services/tasks.service';
import { TaskItem } from '../interfaces/tasks.interface';
import { CreateTaskDto } from '../dtos/tasks.dto';

class IndexController {
  public taskService = new taskService();
    
  public getTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const findAllUsersData: TaskItem[] = await this.taskService.findAllTasks(userId);

      res.status(200).json({ data: findAllUsersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getTaskById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);
      const findOneUserData: TaskItem = await this.taskService.findTaskById(userId, taskId);

      res.status(200).json({ data: findOneUserData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const taskData: CreateTaskDto = req.body;
      const createTaskData: TaskItem = await this.taskService.createTask(taskData);

      res.status(201).json({ data: createTaskData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const taskData: TaskItem = req.body;
      const updateTaskData: TaskItem[] = await this.taskService.updateTask(userId, taskData);

      res.status(200).json({ data: updateTaskData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const userId = Number(req.params.userId);
      const taskId = Number(req.params.taskId);
      const deleteUserData: TaskItem[] = await this.taskService.deleteTask(userId, taskId);

      res.status(200).json({ data: deleteUserData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default IndexController;
