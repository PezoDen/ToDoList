export const a = 7

// import React, {useReducer, useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
// import {
//     addTodolistAC,
//     changeTodolistFilterAC,
//     changeTodolistTitleAC,
//     removeTodolistAC,
//     todolistsReducer
// } from "./state/todolists-reducer";
// import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
//
// export type FilterValuesType = "all" | "completed" | "active"
// export type TodolistType = {
//     id: string
//     title: string
//     filter: FilterValuesType
// }
// export type TasksStateType = {
//     [key: string]: Array<TaskType>
// }
//
// function App() {
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//
//     let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ])
//
//
//     let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
//         [todolistId1]: [
//             {id: v1(), title: "HTML&CSS", isDone: true},
//             {id: v1(), title: "JS", isDone: true},
//             {id: v1(), title: "React", isDone: false},
//             {id: v1(), title: "Redux", isDone: false}],
//         [todolistId2]: [
//             {id: v1(), title: "Chips", isDone: true},
//             {id: v1(), title: "Milk", isDone: true},
//             {id: v1(), title: "Book", isDone: false}]
//     })
//
//
//     function removeTask(id: string, todolistId: string) {
//         const action = removeTaskAC(id, todolistId)
//         dispatchToTasks(action)
//     }
//
//     function addTask(title: string, todolistId: string) {
//         const action = addTaskAC(title, todolistId)
//         dispatchToTasks(action)
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         const action = changeTodolistFilterAC(todolistId, value)
//         dispatchToTodolists(action)
//     }
//
//     function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
//         const action = changeTaskStatusAC(taskId, isDone, todolistId)
//         dispatchToTasks(action)
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
//         const action = changeTaskTitleAC(taskId, newTitle, todolistId)
//         dispatchToTasks(action)
//     }
//
//     let removeTodolist = (todolistId: string) => {
//         const action = removeTodolistAC(todolistId)
//         dispatchToTodolists(action)
//         dispatchToTasks(action)
//     }
//     let changeTodolistTitle = (id: string, newTitle: string) => {
//         const action = changeTodolistTitleAC(id, newTitle)
//         dispatchToTodolists(action)
//     }
//
//     function addTodolist(title: string) {
//         const action = addTodolistAC(title)
//         dispatchToTasks(action)
//         dispatchToTodolists(action)
//     }
//
//     return (
//         <div className="App">
//             <AppBar position="static">
//                 <Toolbar>
//                     <IconButton edge="start" color="inherit" aria-label="menu">
//                         <Menu/>
//                     </IconButton>
//                     <Typography variant="h6">
//                         News
//                     </Typography>
//                     <Button color={"inherit"}>Login</Button>
//                 </Toolbar>
//             </AppBar>
//             <Container fixed={true}>
//                 <Grid container={true} style={{padding: "15px"}}>
//                     <AddItemForm addItem={addTodolist}/>
//                 </Grid>
//                 <Grid container={true} spacing={5}>
//                     {
//                         todolists.map((tl) => {
//                             let tasksForTodolist = tasks[tl.id];
//
//                             if (tl.filter === "completed") {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === true)
//                             }
//                             if (tl.filter === "active") {
//                                 tasksForTodolist = tasksForTodolist.filter(t => t.isDone === false)
//                             }
//
//                             return <Grid item>
//                                 <Paper elevation={10} style={{padding: "15px", borderRadius: "10px"}}>
//                                     <Todolist key={tl.id}
//                                               id={tl.id}
//                                               title={tl.title}
//                                               tasks={tasksForTodolist}
//                                               removeTask={removeTask}
//                                               changeFilter={changeFilter}
//                                               addTask={addTask}
//                                               changeTaskStatus={changeTaskStatus}
//                                               changeTaskTitle={changeTaskTitle}
//                                               changeTodolistTitle={changeTodolistTitle}
//                                               filter={tl.filter}
//                                               removeTodolist={removeTodolist}
//                                     />
//                                 </Paper>
//                             </Grid>
//                         })
//                     }
//                 </Grid>
//             </Container>
//         </div>
//     );
// }
//
// export default App;
