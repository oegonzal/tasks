export interface TaskItem {
    id: number;
    userId: number;
    title: string;
    completed: boolean;
    due: Date;
    description: string;
}