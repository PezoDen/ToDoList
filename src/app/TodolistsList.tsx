import React, {useCallback, useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../state/store";
import {
    addTodolistTC,
    changeTodolistFilterAC,
    changeTodolistTitleTC,
    fetchTodolistsTC,
    FilterValuesType,
    removeTodolistTC,
    TodolistDomainType
} from "../state/todolist-reducer/todolists-reducer";
import {addTaskTC, deleteTaskTC, updateTaskTC} from "../state/tasks-reducer/tasks-reducer";
import {TaskStatuses} from "../api/todolist-api";
import {Grid, Paper} from "@material-ui/core";
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../components/Todolist/Todolist";
import {TasksStateType} from "./App";

export type TodolistsListPropsType = {}

export const TodolistsList: React.FC<TodolistsListPropsType> = () => {

    const todolists = useSelector<AppRootStateType, TodolistDomainType[]>(state => state.todolists)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchTodolistsTC())
    }, [])


    const removeTask = useCallback((id: string, todolistId: string) => {
        const thunk = deleteTaskTC(id, todolistId)
        dispatch(thunk)
    }, [])
    const addTask = useCallback((title: string, todolistId: string) => {
        const thunk = addTaskTC(title, todolistId)
        dispatch(thunk)
    }, [])
    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        const thunk = changeTodolistFilterAC(todolistId, value)
        dispatch(thunk)
    }, [])
    const changeTaskStatus = useCallback((taskId: string, status: TaskStatuses, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {status}, todolistId)
        dispatch(thunk)
    }, [])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todolistId: string) => {
        const thunk = updateTaskTC(taskId, {title: newTitle}, todolistId)
        dispatch(thunk)
    }, [])
    const removeTodolist = useCallback((todolistId: string) => {
        const thunk = removeTodolistTC(todolistId)
        dispatch(thunk)
    }, [])
    const changeTodolistTitle = useCallback((id: string, newTitle: string) => {
        const thunk = changeTodolistTitleTC(id, newTitle)
        dispatch(thunk)
    }, [])
    const addTodolist = useCallback((title: string) => {
        const thunk = addTodolistTC(title)
        dispatch(thunk)
    }, [])


    return <>
        <Grid container={true} style={{padding: "15px"}}>
            <AddItemForm addItem={addTodolist}/>
        </Grid>
        <Grid container={true} spacing={5}>
            {
                todolists.map((tl) => {
                    let allTodolistTasks = tasks[tl.id]
                    let tasksForTodolist = allTodolistTasks;


                    return <Grid item key={tl.id}>
                        <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
                            <Todolist
                                id={tl.id}
                                title={tl.title}
                                tasks={tasksForTodolist}
                                removeTask={removeTask}
                                changeFilter={changeFilter}
                                addTask={addTask}
                                changeTaskStatus={changeTaskStatus}
                                changeTaskTitle={changeTaskTitle}
                                changeTodolistTitle={changeTodolistTitle}
                                filter={tl.filter}
                                removeTodolist={removeTodolist}
                            />
                        </Paper>
                    </Grid>
                })
            }
        </Grid>
    </>
}