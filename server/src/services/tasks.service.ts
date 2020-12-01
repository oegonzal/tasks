import HttpException from '../exceptions/HttpException';
import { TaskItem } from '../interfaces/tasks.interface';
import { User } from '../interfaces/users.interface';
import { CreateTaskDto } from '../dtos/tasks.dto';
import userModel from '../models/users.model';
import { isEmptyObject } from '../utils/util';

class TaskService {
    public users = userModel;

    public async findAllTasks(userId: number): Promise<TaskItem[]> {
        const tasks: TaskItem[] = this.users.find(u => u.id === userId)?.tasks || [];
        return tasks;
    }

    public async findTaskById(userId: number, taskId :number): Promise<TaskItem> {
        const findTask: TaskItem = this.users
                .find(user => user.id === userId)
                ?.tasks?.find(task => task.id === taskId);

        if (!findTask) throw new HttpException(409, "Task not found");

        return findTask;
    }

    public async createTask(taskData: CreateTaskDto): Promise<TaskItem> {
        if (isEmptyObject(taskData)) throw new HttpException(400, "You're not taskData");

        const findUser: User = this.users
                .find(user => user.id === taskData.userId);

        if (!findUser) throw new HttpException(409, "Task not found because user does not exist");

        //  Tasks will be ordered in ascending order (so last task has highest id)
        const newId: number = (findUser?.tasks[findUser?.tasks.length - 1]?.id || 0);

        const createTaskData: TaskItem = { id: newId, ...taskData };

        this.users.find(user => user.id === taskData.userId).tasks = [...findUser?.tasks || [], createTaskData];

        return createTaskData;
    }

    public async updateTask(userId: number, taskData: TaskItem): Promise<TaskItem[]> {
        if (isEmptyObject(taskData)) throw new HttpException(400, "You're not taskData");

        const findTask: TaskItem =
            this.users.find(user => user.id === userId)
                .tasks?.find(task => task.id === taskData.id);

        if (!findTask) throw new HttpException(409, "This is not a task");

        const updateTaskData: TaskItem[] =
            this.users.find(user => user.id === userId)
                .tasks.map((task: TaskItem) => {
                    if (task.id === findTask.id) task = { ...taskData };
                    return task;
                });

        this.users.find(user => user.id === userId).tasks = updateTaskData;

        return updateTaskData;
    }

    public async deleteTask(userId: number, taskId: number): Promise<TaskItem[]> {
        const findTask: TaskItem =
            this.users.find(user => user.id === userId)
                .tasks?.find(task => task.id === taskId);

        if (!findTask) throw new HttpException(409, "This is not a task");

        const deleteTaskData: TaskItem[] =
            this.users.find(user => user.id === userId)
                .tasks.filter(task => task.id !== findTask.id);

        this.users.find(user => user.id === userId).tasks = deleteTaskData;

        return deleteTaskData;
    }
}

export default TaskService;
