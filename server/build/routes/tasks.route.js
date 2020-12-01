"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tasks_controller_1 = __importDefault(require("../controllers/tasks.controller"));
const tasks_dto_1 = require("../dtos/tasks.dto");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
const auth_middleware_1 = __importDefault(require("../middlewares/auth.middleware"));
class TasksRoute {
    constructor() {
        this.path = '/user/:userId(\\d+)/tasks';
        this.router = express_1.Router();
        this.tasksController = new tasks_controller_1.default();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, [auth_middleware_1.default], this.tasksController.getTasks);
        this.router.get(`${this.path}/:taskId(\\d+)`, [auth_middleware_1.default], this.tasksController.getTaskById);
        this.router.post(`${this.path}`, [auth_middleware_1.default, validation_middleware_1.default(tasks_dto_1.CreateTaskDto)], this.tasksController.createTask);
        this.router.put(`${this.path}/:taskId(\\d+)`, [auth_middleware_1.default, validation_middleware_1.default(tasks_dto_1.CreateTaskDto, 'body', true)], this.tasksController.updateTask);
        this.router.delete(`${this.path}/:taskId(\\d+)`, [auth_middleware_1.default], this.tasksController.deleteTask);
    }
}
exports.default = TasksRoute;
//# sourceMappingURL=tasks.route.js.map