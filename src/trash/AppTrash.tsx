export const param = 9

// import React, {useState} from 'react';
// import './App.css';
// import {TaskType, Todolist} from "./Todolist";
// import {v1} from "uuid";
// import {AddItemForm} from "./AddItemForm";
// import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
// import {Menu} from "@material-ui/icons";
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
//
//     function removeTask(id: string, todolistId: string) {
//         let task = tasks[todolistId];
//         let filteredTasks = task.filter(t => t.id !== id);
//         tasks[todolistId] = filteredTasks;
//         setTasks({...tasks})
//     }
//
//     function addTask(title: string, todolistId: string) {
//         let newTask = {id: v1(), title: title, isDone: false}
//         let task = tasks[todolistId];
//         let newTasks = [...task, newTask]
//         tasks[todolistId] = newTasks;
//         setTasks({...tasks})
//     }
//
//     function changeFilter(value: FilterValuesType, todolistId: string) {
//         let todolist = todolists.find(tl => tl.id === todolistId)
//         if (todolist) {
//             todolist.filter = value
//             setTodolists([...todolists])
//         }
//     }
//
//     function changeTaskStatus(taskId: string, isDone: boolean, todolistId: string) {
//         let taskObj = tasks[todolistId]
//         let task = taskObj.find(t => t.id === taskId)
//         if (task) {
//             task.isDone = isDone;
//             setTasks({...tasks})
//         }
//     }
//
//     function changeTaskTitle(taskId: string, newTitle: string, todolistId: string) {
//         let taskObj = tasks[todolistId]
//         let task = taskObj.find(t => t.id === taskId)
//         if (task) {
//             task.title = newTitle;
//             setTasks({...tasks})
//         }
//     }
//
//     let removeTodolist = (todolistId: string) => {
//         let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
//         setTodolists(filteredTodolist)
//
//         delete tasks[todolistId];
//         setTasks({...tasks})
//     }
//     let changeTodolistTitle = (id: string, newTitle: string) => {
//         const todolist = todolists.find(tl => tl.id === id)
//         if (todolist) {
//             todolist.title = newTitle
//             setTodolists([...todolists])
//         }
//     }
//
//     function addTodolist(title: string) {
//         let todolist: TodolistType = {
//             id: v1(),
//             filter: "all",
//             title: title
//         }
//         setTodolists([...todolists, todolist])
//         setTasks({
//             ...tasks,
//             [todolist.id]: []
//         })
//     }
//
//     let todolistId1 = v1()
//     let todolistId2 = v1()
//
//
//     let [todolists, setTodolists] = useState<Array<TodolistType>>([
//         {id: todolistId1, title: "What to learn", filter: "all"},
//         {id: todolistId2, title: "What to buy", filter: "all"}
//     ])
//
//
//     let [tasks, setTasks] = useState<TasksStateType>({
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
