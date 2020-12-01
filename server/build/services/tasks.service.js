"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpException_1 = __importDefault(require("../exceptions/HttpException"));
const users_model_1 = __importDefault(require("../models/users.model"));
const util_1 = require("../utils/util");
class TaskService {
    constructor() {
        this.users = users_model_1.default;
    }
    async findAllTasks(userId) {
        var _a;
        const tasks = ((_a = this.users.find(u => u.id === userId)) === null || _a === void 0 ? void 0 : _a.tasks) || [];
        return tasks;
    }
    async findTaskById(userId, taskId) {
        var _a, _b;
        const findTask = (_b = (_a = this.users
            .find(user => user.id === userId)) === null || _a === void 0 ? void 0 : _a.tasks) === null || _b === void 0 ? void 0 : _b.find(task => task.id === taskId);
        if (!findTask)
            throw new HttpException_1.default(409, "Task not found");
        return findTask;
    }
    async createTask(taskData) {
        var _a;
        if (util_1.isEmptyObject(taskData))
            throw new HttpException_1.default(400, "You're not taskData");
        const findUser = this.users
            .find(user => user.id === taskData.userId);
        if (!findUser)
            throw new HttpException_1.default(409, "Task not found because user does not exist");
        //  Tasks will be ordered in ascending order (so last task has highest id)
        const newId = (((_a = findUser === null || findUser === void 0 ? void 0 : findUser.tasks[(findUser === null || findUser === void 0 ? void 0 : findUser.tasks.length) - 1]) === null || _a === void 0 ? void 0 : _a.id) || 0);
        const createTaskData = Object.assign({ id: newId }, taskData);
        this.users.find(user => user.id === taskData.userId).tasks = [...(findUser === null || findUser === void 0 ? void 0 : findUser.tasks) || [], createTaskData];
        return createTaskData;
    }
    async updateTask(userId, taskData) {
        var _a;
        if (util_1.isEmptyObject(taskData))
            throw new HttpException_1.default(400, "You're not taskData");
        const findTask = (_a = this.users.find(user => user.id === userId)
            .tasks) === null || _a === void 0 ? void 0 : _a.find(task => task.id === taskData.id);
        if (!findTask)
            throw new HttpException_1.default(409, "This is not a task");
        const updateTaskData = this.users.find(user => user.id === userId)
            .tasks.map((task) => {
            if (task.id === findTask.id)
                task = Object.assign({}, taskData);
            return task;
        });
        this.users.find(user => user.id === userId).tasks = updateTaskData;
        return updateTaskData;
    }
    async deleteTask(userId, taskId) {
        var _a;
        const findTask = (_a = this.users.find(user => user.id === userId)
            .tasks) === null || _a === void 0 ? void 0 : _a.find(task => task.id === taskId);
        if (!findTask)
            throw new HttpException_1.default(409, "This is not a task");
        const deleteTaskData = this.users.find(user => user.id === userId)
            .tasks.filter(task => task.id !== findTask.id);
        this.users.find(user => user.id === userId).tasks = deleteTaskData;
        return deleteTaskData;
    }
}
exports.default = TaskService;
//# sourceMappingURL=tasks.service.js.map