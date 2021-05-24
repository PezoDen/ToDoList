import React, {useCallback, useEffect} from "react";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "../Task/Task";
import {TaskStatuses, TaskType} from "../../api/todolist-api";
import {FilterValuesType} from "../../state/todolist-reducer/todolists-reducer";
import {fetchTasksTC} from "../../state/tasks-reducer/tasks-reducer";
import {useDispatch} from "react-redux";


export type PropsType = {
    id: string
    title: string
    tasks: TaskType[]
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    removeTask: (id: string, todolistId: string) => void
    changeTaskStatus: (id: string, status: TaskStatuses, todolistId: string) => void
    changeTaskTitle: (id: string, title: string, todolistId: string) => void
}

export const Todolist = React.memo((props: PropsType) => {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(props.id))
    }, [])


    const onAllClickHandler = useCallback(() => {
        props.changeFilter("all", props.id)
    }, [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => {
        props.changeFilter("active", props.id)
    }, [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => {
        props.changeFilter("completed", props.id)
    }, [props.changeFilter, props.id])

    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle)
    }, [props.changeTodolistTitle, props.id])
    const addTask = useCallback((title: string) => {
        props.addTask(title, props.id)
    }, [props.addTask, props.id])

    let tasksForTodolist = props.tasks
    if (props.filter === "completed") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.Completed)
    }
    if (props.filter === "active") {
        tasksForTodolist = props.tasks.filter(t => t.status === TaskStatuses.New)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <IconButton onClick={removeTodolist} color={"primary"}><Delete/></IconButton>
            </h3>
            <AddItemForm addItem={addTask}/>
            <div style={{listStyle: "none", padding: "0"}}>
                {
                    tasksForTodolist.map(t => <Task
                        key={props.id}
                        task={t}
                        todolistId={props.id}
                        changeTaskStatus={props.changeTaskStatus}
                        changeTaskTitle={props.changeTaskTitle}
                        removeTask={props.removeTask}
                    />)
                }
            </div>
            <div style={{textAlign: "center"}}>
                <Button color={"primary"}
                        variant={props.filter === "all" ? "contained" : "outlined"}
                        onClick={onAllClickHandler}>All</Button>
                <Button
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

