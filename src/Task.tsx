import {TaskType} from "./App";
import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton} from "@material-ui/core";
import {EditableSpan} from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";

// export type PropsType = {
//   changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
//   changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
//   removeTask: (taskId: string, todolistId: string) => void
//   task: TaskType
//   todolistId: string
//   taskId: string
// }

export type PropsType = {
  taskId: string
  todolistId: string
};

export const Task = React.memo((props: PropsType) => {
    const task = useSelector<AppRootStateType, TaskType | undefined>(state => state.tasks[props.todolistId].find(t => t.id === props.taskId))
    if (!task) throw new Error("wrong taskId")
    const dispatch = useDispatch()

    const removeTask = useCallback(() => {
      dispatch(removeTaskAC(props.taskId, props.todolistId))
    },[dispatch,props])
    const changeStatus = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeTaskStatusAC(props.taskId, e.currentTarget.checked, props.todolistId))
    },[dispatch,props])
    const changeTaskTitle = useCallback((title: string) => {
      dispatch(changeTaskTitleAC(props.taskId, title, props.todolistId))
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