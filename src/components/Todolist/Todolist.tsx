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
    const {id, changeFilter, changeTodolistTitle: changeTDLTitle,addTask: aDDTask } = props
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTasksTC(id))
    }, [dispatch,id])


    const onAllClickHandler = useCallback(() => {
        changeFilter("all", id)
    }, [changeFilter, id])
    const onActiveClickHandler = useCallback(() => {
        changeFilter("active", id)
    }, [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => {
        changeFilter("completed", id)
    }, [changeFilter, id])

    const removeTodolist = () => {
        props.removeTodolist(id)
    }
    const changeTodolistTitle = useCallback((newTitle: string) => {
        changeTDLTitle(id, newTitle)
    }, [changeTDLTitle, id])
    const addTask = useCallback((title: string) => {
        aDDTask(title, id)
    }, [aDDTask, id])

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
                        key={t.id}
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
                <Button color={"secondary"}
                    variant={props.filter === "active" ? "contained" : "outlined"}
                    onClick={onActiveClickHandler}>Active</Button>
                <Button
                    variant={props.filter === "completed" ? "contained" : "outlined"}
                    onClick={onCompletedClickHandler}>Completed</Button>
            </div>
        </div>
    )
})

