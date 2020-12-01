import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { TaskItem } from "types";
import { routes } from "navigation";
import { api } from "services";
import { Task } from "components";
import { StyledTasksPage } from "./Tasks.styled";
import { AppContext } from "AppContext";
import { GET_TASKS } from "actions";


function TaskPage() {
    const { state, dispatch } = useContext(AppContext);
    const history = useHistory();

    useEffect(() => {
        async function getTasks() {
            const { data } = await api.fetchBase({ path: `/user/${state.userId}/tasks` });
            dispatch({ type: GET_TASKS, meta: data });
        }

        getTasks();
    }, [state.userId, dispatch]);

    function onSelectTask(task: TaskItem) {
        history.push(`/${routes.CONFIGURE_TASKS}/${task.id}`);
    }

    function goToCreateNewTaskPage(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        history.push(`/${routes.CONFIGURE_TASKS}/create`);
    }

    return (
        <StyledTasksPage>
            <div>
                {state.tasks?.map((task) => {
                    return <Task key={task.id} task={task} onClick={onSelectTask} />
                })}

                {!state.tasks.length && <div>You have zero tasks in the list</div>}
            </div>

            <button onClick={goToCreateNewTaskPage}>Add new</button>

        </StyledTasksPage>
    )
}

export default TaskPage;