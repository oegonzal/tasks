import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { StyledConfiguredTasksPage } from "./ConfigureTask.styled";
import { api } from "services";
import { AppContext } from "AppContext";
import { TaskItem } from "types";
import { routes } from "navigation";

function ConfigureTask() {
    const { taskId }: any = useParams();
    const history = useHistory();
    const { state } = useContext(AppContext);
    const [task, setTask] = useState<TaskItem>({} as TaskItem);

    useEffect(() => {
        async function getTasks(taskId: number) {
            const { data } = await api.fetchBase({ path: `/user/${state.userId}/tasks/${taskId}` });
            setTask(data?.data || {});
        }
        if (!isNaN(taskId)) getTasks(taskId);
    }, []);


    function onChangeCompleteStatus() {
        setTask({...task, completed: !task.completed })
    }

    function onDueDateChange(e: React.ChangeEvent<HTMLInputElement> ) {
        const dueDate = new Date(Date.parse(e.target.value)).toISOString();
        setTask({ ...task, due: dueDate })
    }

    async function onSaveClicked() {
        //  Update
        if (!isNaN(taskId)) {
            const { data } = await api.fetchBase({ 
                path: `/user/${state.userId}/tasks/${taskId}`, method: 'PUT', body: task, 
            });
            if (data) history.push(`/${routes.TASKS}/${task.id}`);
        } 
        //  Create
        else {
            const { data } = await api.fetchBase({ 
                path: `/user/${state.userId}/tasks`, method: 'POST', body: { 
                    ...task, 
                    completed: !!task.completed, 
                    userId: state.userId 
                }, 
            });
            if (data) history.push(`/${routes.TASKS}/${task.id}`);
        }
    }

    async function onDeleteClicked() {
        const { data } = await api.fetchBase({ 
            path: `/user/${state.userId}/tasks/${taskId}`, method: 'DELETE', body: task, 
        });
        if (data) history.push(`/${routes.TASKS}/${task.id}`);
    }

    return (
        <StyledConfiguredTasksPage>
            <div>
                <label>Title:</label>
                <input placeholder={"Take out trash"} value={task.title} onChange={(e) => setTask({ ...task, title: e.target.value})} />
            </div>
            <div className="ConfiguredTaskPage__description">
                <label>Description</label>
                <textarea value={task.description} onChange={(e) => setTask({ ...task, description: e.target.value})} ></textarea>
            </div>
            <div>
                <label>Due date:</label>
                <input type="date" value={String(task.due).substr(0, 10) || new Date().toISOString().substr(0, 10)} 
                    onChange={onDueDateChange}/>
            </div>
            <div>
                <label>Due date:</label>

                <input type="radio" checked={!task.completed} onChange={onChangeCompleteStatus} 
                        name="ConfiguredTaskPage__due" id="ConfiguredTaskPage__new" />
                <label>New</label>

                <input type="radio" checked={task.completed} onChange={onChangeCompleteStatus} 
                        name="ConfiguredTaskPage__due" id="ConfiguredTaskPage__completed" />
                <label>Completed</label>
            </div>
            <div>
                <button onClick={onSaveClicked}>Save</button>
                {!isNaN(taskId) && <button onClick={onDeleteClicked}>Delete</button>}
            </div>
        </StyledConfiguredTasksPage>
    )
}

export default ConfigureTask;