import React, { useState, useContext, useRef } from "react";
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en';
import { TaskItem } from "types";
import { StyledTask } from "./Task.styled";
import { AppContext } from "AppContext";

TimeAgo.addLocale(en);
const timeAgo = new TimeAgo('en-US');


interface TaskProps {
    task: TaskItem,
    onClick: Function;
}

const Task: React.FC<TaskProps> = ({ task, onClick }) => {
    const { state, dispatch } = useContext(AppContext);
    const [isCompleted, setIsCompleted] = useState(task.completed);
    const checkboxRef: any = useRef();

    function onCheckboxChanged(e: React.ChangeEvent<HTMLInputElement>) {
        setIsCompleted(!isCompleted)
    }

    function onTaskClick(e: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        if (checkboxRef.current?.contains(e.target)) {
            return
        }
        onClick(task);
    }

    return (
        <StyledTask onClick={onTaskClick}>
            <div>
                <input ref={checkboxRef} type="checkbox" disabled checked={isCompleted} onChange={onCheckboxChanged} />
            </div>
            <div>
                <h5>{task.title}</h5>
                <p>{task.description}</p>
            </div>
            <div>
                {task.due ? timeAgo.format(new Date(task.due)) : ''}
            </div>
        </StyledTask>
    );
}

export default Task;