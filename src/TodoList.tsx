import React, {useCallback} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AdditemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTodoList: (todoListID: string) => void
  addTask: (title: string, todoListID: string) => void
  removeTask: (taskId: string, todoListID: string) => void
  changeFilter: (filterValue: FilterValuesType, todoListID: string) => void
  changeStatus: (taskId: string, isDone: boolean, todoListID: string) => void
  changeTaskTitle: (taskId: string, title: string, todoListID: string) => void
  changeTodoListTitle: (todoListID: string, title: string) => void
}


const TodoList = React.memo((props: PropsType) => {
  const {id, addTask, changeTodoListTitle} = props
  console.log("Todolist called")

  let tasksForTodolist = props.tasks

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(task => !task.isDone)
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(task => task.isDone)
  }

  // const tasks = tasksForTodolist.map(taskObj => {
  //   const removeTask = () => {
  //     props.removeTask(taskObj.id, props.id)
  //   }
  //   const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
  //     props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
  //   }
  //   const changeTaskTitle = (title: string) => {
  //     props.changeTaskTitle(taskObj.id, title, props.id)
  //   }
  //
  //   return (
  //     <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
  //       <Checkbox
  //         color={"primary"}
  //         onChange={changeStatus}
  //         checked={taskObj.isDone}/>
  //       <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle}/>
  //       <IconButton onClick={removeTask}>
  //         <Delete/>
  //       </IconButton>
  //     </li>
  //   )
  // })

  const onAllClickHandler = () => {
    props.changeFilter("all", props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active", props.id)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed", props.id)
  }
  const removeTodoList = () => {
    props.removeTodoList(props.id)
  }

  const addTaskHandler = useCallback((title: string) => {
    addTask(title, id)
  }, [addTask, id])

  const changeTDLTitle = useCallback((title: string) => {
    changeTodoListTitle(id, title)
  }, [changeTodoListTitle, id])


  const tasksMapCallback = (taskObj: TaskType) => {

    return (
      <Task
        key={taskObj.id}
        taskId={taskObj.id}
        todolistId={props.id}/>
    )
  }
  return (
    <div>
      <h3>
        <EditableSpan value={props.title} getNewTitle={changeTDLTitle}/>
        {/*<button onClick={removeTodoList}>x</button>*/}
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTaskHandler}/>
      <ul style={{listStyle: "none", padding: "0"}}>
        {tasksForTodolist.map(tasksMapCallback)}
      </ul>
      <div style={{textAlign: "center"}}>
        <Button
          variant={props.filter === "all" ? "contained" : "outlined"}
          onClick={onAllClickHandler}>All
        </Button>
        <Button
          variant={props.filter === "active" ? "contained" : "outlined"}
          onClick={onActiveClickHandler}>Active
        </Button>
        <Button
          variant={props.filter === "completed" ? "contained" : "outlined"}
          onClick={onCompletedClickHandler}>Completed
        </Button>
      </div>
    </div>
  );
})

export default TodoList