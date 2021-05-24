import React, {ChangeEvent, useCallback} from "react";
import {Button, Checkbox} from "@material-ui/core";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskStatuses, TaskType} from "../../api/todolist-api";

export type TaskPropsType = {
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
    task: TaskType
    todolistId: string
}
export const Task = React.memo((props: TaskPropsType) => {
    const onRemoveHandler = () => {
        props.removeTask(props.task.id, props.todolistId)
    }
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        props.changeTaskStatus(props.task.id, newIsDoneValue ? TaskStatuses.Completed : TaskStatuses.New, props.todolistId)
    }
    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todolistId)
    },[props.changeTaskTitle,props.task.id,props.todolistId])

    return <div key={props.task.id} className={props.task.status === TaskStatuses.Completed ? "is-done" : ""}>
        <Checkbox
            color={"primary"}
            checked={props.task.status === TaskStatuses.Completed}
            onChange={onChangeStatusHandler}
        />
        <EditableSpan title={props.task.title} onChange={onChangeTitleHandler}/>
        <Button onClick={onRemoveHandler} color={"primary"}><Delete/></Button>
    </div>
})