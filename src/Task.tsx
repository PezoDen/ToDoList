import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

type PropsType = {
  taskId: string
  todoListId: string
};

export const Task = React.memo((props: PropsType) => {
    const task = useSelector<AppRootStateType, TaskType | undefined>(state => state.tasks[props.todoListId].find(t => t.id === props.taskId))
    if (!task) throw new Error("wrong taskId")
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
      dispatch(removeTaskAC(props.taskId, props.todoListId))
    },[dispatch,props])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todoListId))
    },[dispatch,props])
    const changeTaskTitle = useCallback((title: string) => {
      dispatch(changeTaskTitleAC(props.taskId, title, props.todoListId))
    },[dispatch,props])

    return <li className={task.isDone ? "is-done" : ""}>
      <Checkbox
        color={"primary"}
        onChange={changeStatus}
        checked={task.isDone}/>
      <EditableSpan value={task.title} getNewTitle={changeTaskTitle}/>
      <IconButton onClick={removeTask}>
        <Delete/>
      </IconButton>
    </li>;
  }
)