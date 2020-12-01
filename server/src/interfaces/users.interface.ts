import { TaskItem } from "./tasks.interface";

export interface User {
  id: number;
  email: string;
  password: string;
  tasks?: Array<TaskItem>
}
