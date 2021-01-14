import React, {useReducer} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
  AddTodolistAC,
  ChangeTodolistFilterAC,
  ChangeTodolistTitleAC,
  RemoveTodolistAC,
  todoListsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


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

function AppWithReducers() {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todoLists, dispatchToTodolist] = useReducer(todoListsReducer, [
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
  ])


  const [tasks, dispatchToTask] = useReducer(tasksReducer, {
    [todoListId1]: [
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
    ],
    [todoListId2]: [
      {id: v1(), title: "Bear", isDone: true},
      {id: v1(), title: "Fish", isDone: true},
      {id: v1(), title: "Chips", isDone: false},
    ]
  })

  function removeTask(taskId: string, todoListID: string) {
    dispatchToTask(removeTaskAC(todoListID, todoListID))
  }

  function addTask(title: string, todoListID: string) {
    dispatchToTask(addTaskAC(title, todoListID))
  }

  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    dispatchToTask(changeTaskStatusAC(taskId, isDone, todoListID))
  }

  function changeTaskTitle(taskId: string, title: string, todoListID: string) {
    dispatchToTask(changeTaskTitleAC(taskId, title, todoListID))
  }

  function changeFilter(filterValue: FilterValuesType, todoListID: string) {
    const action = ChangeTodolistFilterAC(todoListID, filterValue)
    dispatchToTodolist(action)
  }

  function removeTodoList(todoListID: string) {
    let action = RemoveTodolistAC(todoListID)
    dispatchToTodolist(action)
    dispatchToTask(action)
  }

  function AddTodoList(title: string) {
    const action = AddTodolistAC(title)
    dispatchToTask(action)
    dispatchToTodolist(action)
  }

  function changeTodoListTitle(todoListID: string, title: string) {
    dispatchToTodolist(ChangeTodolistTitleAC(todoListID, title))
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
              <Grid item>
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

export default AppWithReducers;
