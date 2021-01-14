import React, {ChangeEvent} from 'react';
import {FilterValuesType, TaskType} from "./App";
import AddItemForm from "./AdditemForm";
import {EditableSpan} from "./EditableSpan";
import {Button, Checkbox, IconButton} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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


function TodoList(props: PropsType) {

  const tasks = props.tasks.map(taskObj => {
    const removeTask = () => {
      props.removeTask(taskObj.id, props.id)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(taskObj.id, e.currentTarget.checked, props.id)
    }
    const changeTaskTitle = (title: string) => {
      props.changeTaskTitle(taskObj.id, title, props.id)
    }
    return (
      <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
        <Checkbox
          color={"primary"}
          onChange={changeStatus}
          checked={taskObj.isDone}/>
        <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle}/>
        <IconButton onClick={removeTask}>
          <Delete/>
        </IconButton>
      </li>
    )
  })

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

  const addTask = (title: string) => {
    props.addTask(title, props.id)
  }

  const changeTodoListTitle = (title: string) => {
    props.changeTodoListTitle(props.id, title)
  }


  return (
    <div>
      <h3>
        <EditableSpan value={props.title} getNewTitle={changeTodoListTitle}/>
        {/*<button onClick={removeTodoList}>x</button>*/}
        <IconButton onClick={removeTodoList}>
          <Delete/>
        </IconButton>
      </h3>
      <AddItemForm addItem={addTask}/>
      <ul style={{listStyle: "none", padding: "0"}}>
        {tasks}
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
}

export default TodoList