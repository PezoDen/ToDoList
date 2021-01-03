import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AdditemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";


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
type TaskStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  const todoListId1 = v1()
  const todoListId2 = v1()

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: 'What to learn', filter: 'all'},
    {id: todoListId2, title: 'What to buy', filter: 'all'}
  ])


  const [tasks, setTasks] = useState<TaskStateType>({
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
    const todoListTasks = tasks[todoListID]
    tasks[todoListID] = todoListTasks.filter(t => t.id !== taskId)
    setTasks({...tasks})
  }
  function addTask(title: string, todoListID: string) {
    const newTask: TaskType = {
      id: v1(),
      title: title,
      isDone: false
    }
    tasks[todoListID] = [newTask, ...tasks[todoListID]]
    setTasks({...tasks})
  }
  function changeStatus(taskId: string, isDone: boolean, todoListID: string) {
    const todoListTasks = tasks[todoListID]
    const task = todoListTasks.find(task => task.id === taskId)
    if (task) {
      task.isDone = isDone
      setTasks({...tasks})
    }
  }
  function changeTaskTitle(taskId: string, title: string, todoListID: string) {
    const todoListTasks = tasks[todoListID]
    const task = todoListTasks.find(task => task.id === taskId)
    if (task) {
      task.title = title
      setTasks({...tasks})
    }
  }

  function changeFilter(filterValue: FilterValuesType, todoListID: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID)
    if (todoList) {
      todoList.filter = filterValue
      setTodoLists([...todoLists])
    }
  }
  function removeTodoList(todoListID: string) {
    setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
    // setTasks({...tasks})
  }
  function AddTodoList(title: string) {
    const newTodoListID = v1()
    const newTodoList: TodoListType = {
      id: newTodoListID,
      title: title,
      filter: "all"
    }
    setTodoLists([...todoLists, newTodoList])
    setTasks({
      ...tasks,
      [newTodoListID]: []
    })
  }
  function changeTodoListTitle(todoListID: string, title: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID)
    if (todoList) {
      todoList.title = title
      setTodoLists([...todoLists])
    }
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
                <Paper elevation={5} style={{padding: "15px", borderRadius: "15px"}} >
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

export default App;
