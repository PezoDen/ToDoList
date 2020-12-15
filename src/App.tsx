import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";


export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type FilterValuesType = "all" | "active" | "completed"

type TodolistType = {
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

  const [todoLists, setTodoLists] = useState<Array<TodolistType>>([
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

  function changeFilter(filterValue: FilterValuesType, todoListID: string) {
    const todoList = todoLists.find(tl => tl.id === todoListID)
    if (todoList) {
      todoList.filter = filterValue
      setTodoLists([...todoLists])
    }
  }

  function removeTask(taskId: string, todoListID: string) {
    const todoListTasks = tasks[todoListID]
    tasks[todoListID]=todoListTasks.filter(t => t.id !== taskId)
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
  function removeTodoList(todoListID: string) {
   setTodoLists(todoLists.filter(tl => tl.id !== todoListID))
    delete tasks[todoListID]
    // setTasks({...tasks})
  }


  return (
    <div className="App">
      {
        todoLists.map(tl => {
          let taskForTodoList = tasks[tl.id]
          if (tl.filter === "active") {
            taskForTodoList = tasks[tl.id].filter(task => !task.isDone)
          }
          if (tl.filter === "completed") {
            taskForTodoList =  tasks[tl.id].filter(task => task.isDone)
          }

          return(
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
          />
          )
        })
      }
    </div>
  );
}

export default App;
