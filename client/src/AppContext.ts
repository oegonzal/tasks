import React from "react";
import { LOGIN, GET_TASKS, GET_TASK, UPDATE_TASK, CREATE_TASK, REMOVE_TASK } from "actions";
import { AppReducersState, AppActions, AppContextType, TaskItem } from "types";


export const AppReducer = (state: AppReducersState, action: AppActions) => {
    switch (action.type) {
        case LOGIN: {
            const { id: userId } = action.meta;
            return { ...state, userId };
        }
        case GET_TASKS: {
            const { data } = action.meta;
            
            let tasks = data.sort((task: TaskItem) => (!task.completed ? -1 : 1));
            const breakInd = tasks.findIndex((task: TaskItem) => (task.completed));
            const incompleteTasks = tasks.slice(0, breakInd);
            const completeTasks = tasks.slice(breakInd, tasks.length);
            tasks = [...incompleteTasks, ...completeTasks];

            return { ...state, tasks };
        }
        case UPDATE_TASK: {
            const { data } = action.meta;
            return { ...state, };
        }
        case CREATE_TASK: {
            const { data } = action.meta;
            return { ...state, };
        }
        case REMOVE_TASK: {
            const { data } = action.meta;
            return { ...state, };
        }
        case GET_TASK: {
            const { data } = action.meta;
            return { ...state, };
        }
        default:
            return state;
    }
}
export const AppContext = React.createContext<AppContextType>({} as AppContextType);