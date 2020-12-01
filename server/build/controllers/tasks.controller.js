"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_service_1 = __importDefault(require("../services/tasks.service"));
class IndexController {
    constructor() {
        this.taskService = new tasks_service_1.default();
        this.getTasks = async (req, res, next) => {
            try {
                const userId = Number(req.params.userId);
                const findAllUsersData = await this.taskService.findAllTasks(userId);
                res.status(200).json({ data: findAllUsersData, message: 'findAll' });
            }
            catch (error) {
                next(error);
            }
        };
        this.getTaskById = async (req, res, next) => {
            try {
                const userId = Number(req.params.userId);
                const taskId = Number(req.params.taskId);
                const findOneUserData = await this.taskService.findTaskById(userId, taskId);
                res.status(200).json({ data: findOneUserData, message: 'findOne' });
            }
            catch (error) {
                next(error);
            }
        };
        this.createTask = async (req, res, next) => {
            try {
                const taskData = req.body;
                const createTaskData = await this.taskService.createTask(taskData);
                res.status(201).json({ data: createTaskData, message: 'created' });
            }
            catch (error) {
                next(error);
            }
        };
        this.updateTask = async (req, res, next) => {
            try {
                const userId = Number(req.params.userId);
                const taskData = req.body;
                const updateTaskData = await this.taskService.updateTask(userId, taskData);
                res.status(200).json({ data: updateTaskData, message: 'updated' });
            }
            catch (error) {
                next(error);
            }
        };
        this.deleteTask = async (req, res, next) => {
            try {
                const userId = Number(req.params.userId);
                const taskId = Number(req.params.taskId);
                const deleteUserData = await this.taskService.deleteTask(userId, taskId);
                res.status(200).json({ data: deleteUserData, message: 'deleted' });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.default = IndexController;
//# sourceMappingURL=tasks.controller.js.map