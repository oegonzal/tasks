export type InputFields = {
    type: string;
    placeholder: string;
    name: string;
    value: string;
}

export type KeyValue = {
    [key: string]: string;
}

export type ApiResponse = {
    data?: any;
    error: any;
}

export interface RequestConfig {
    path?: string;
    [options: string]: string | Object | undefined;
}

export type TaskItem = {
    id: number;
    title: string;
    completed: boolean;
    due: string;
    description: string;
}

export type AppReducersState = {
    tasks: TaskItem[];
    userId?: string;
}

export type AppActions = { 
    type: string;
    meta: any;
}

export interface AppContextType {
    state: AppReducersState;
    dispatch: Function;
}