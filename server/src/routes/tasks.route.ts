import { Router } from 'express';
import TasksController from '../controllers/tasks.controller';
import { CreateTaskDto } from '../dtos/tasks.dto';
import Route from '../interfaces/routes.interface';
import validationMiddleware from '../middlewares/validation.middleware';
import authMiddleware from '../middlewares/auth.middleware';

class TasksRoute implements Route {
  public path = '/user/:userId(\\d+)/tasks';
  public router = Router();
  public tasksController = new TasksController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, [authMiddleware], this.tasksController.getTasks);
    this.router.get(`${this.path}/:taskId(\\d+)`, [authMiddleware], this.tasksController.getTaskById);
    this.router.post(`${this.path}`, [
      // authMiddleware, validationMiddleware(CreateTaskDto)
    ], this.tasksController.createTask);
    this.router.put(`${this.path}/:taskId(\\d+)`, [authMiddleware, validationMiddleware(CreateTaskDto, 'body', true)], this.tasksController.updateTask);
    this.router.delete(`${this.path}/:taskId(\\d+)`, [authMiddleware], this.tasksController.deleteTask);
  }
}

export default TasksRoute;
