import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "./state/tasks-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TaskStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {

  let todoLists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
  let tasks = useSelector<AppRootStateType, TaskStateType>(state => state.tasks)

  const dispatch = useDispatch()


  function removeTask(taskId: string, todoListID: string) {
    dispatch(removeTaskAC(todoListID, todoListID))
  }

  function addTask(title: string, todoListID: string) {
    dispatch(addTaskAC(title, todoListID))
  }

  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    dispatch(changeTaskStatusAC(taskId, isDone, todoListID))
  }

  function changeTaskTitle(taskId: string, title: string, todoListID: string) {
    dispatch(changeTaskTitleAC(taskId, title, todoListID))
  }

  function changeFilter(filterValue: FilterValuesType, todoListID: string) {
    const action = ChangeTodolistFilterAC(todoListID, filterValue)
    dispatch(action)
  }

  function removeTodoList(todoListID: string) {
    let action = RemoveTodolistAC(todoListID)
    dispatch(action)
  }

  function AddTodoList(title: string) {
    dispatch(AddTodolistAC(title))
  }

  function changeTodoListTitle(todoListID: string, title: string) {
    dispatch(ChangeTodolistTitleAC(todoListID, title))
  }


  return (
    <div className="App">
      <AppBar position={"static"}>
        <Toolbar>
          <IconButton edge={"start"} color={"inherit"} aria-label={"menu"}>
            <Menu/>
          </IconButton>
          <Typography variant={"h6"}>
            News
          </Typography>
          <Button color={"inherit"}>Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed={true}>
        <Grid container={true} style={{padding: "15px"}}>
          <AddItemForm addItem={AddTodoList}/>
        </Grid>
        <Grid container={true} spacing={5}>{
          todoLists.map(tl => {
            let taskForTodoList = tasks[tl.id]
            if (tl.filter === "active") {
              taskForTodoList = tasks[tl.id].filter(task => !task.isDone)
            }
            if (tl.filter === "completed") {
              taskForTodoList = tasks[tl.id].filter(task => task.isDone)
            }

            return (
              <Grid item key={tl.id}>
                <Paper elevation={5} style={{padding: "15px", borderRadius: "15px"}}>
                  <TodoList
                    key={tl.id}
                    id={tl.id}
                    title={tl.title}
                    tasks={taskForTodoList}
                    addTask={addTask}
                    removeTask={removeTask}
                    changeFilter={changeFilter}
                    changeStatus={changeStatus}
                    filter={tl.filter}
                    removeTodoList={removeTodoList}
                    changeTaskTitle={changeTaskTitle}
                    changeTodoListTitle={changeTodoListTitle}
                  />
                </Paper>
              </Grid>
            )
          })
        }</Grid>
      </Container>
    </div>
  );
}

export default AppWithRedux;
