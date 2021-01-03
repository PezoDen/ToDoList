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

  // const [title, setTitle] = useState<string>("")
  // const [error, setError] = useState<string | null>(null)

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
        {/*<input*/}
        {/*  onChange={changeStatus}*/}
        {/*  type="checkbox"*/}
        {/*  checked={taskObj.isDone}/>*/}
        <EditableSpan value={taskObj.title} getNewTitle={changeTaskTitle}/>
        {/*<button onClick={removeTask}>x</button>*/}
        <IconButton onClick={removeTask}>
          <Delete/>
        </IconButton>



      </li>
    )
  })

  // function addTask() {
  //   const trimmedTitle = title.trim()
  //   if (trimmedTitle) {
  //     props.addTask(trimmedTitle,props.id)
  //   } else {
  //     setError("Title is required!")
  //   }
  //   setTitle("")
  // }

  // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
  //   setTitle(e.currentTarget.value)
  //   setError(null)
  // }
  // const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") addTask()
  // }
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
      {/*<div>*/}
      {/*  <input*/}
      {/*    value={title}*/}
      {/*    onChange={onChangeHandler}*/}
      {/*    onKeyPress={onKeyPressEnter}*/}
      {/*    className={error ? "error" : ''}*/}
      {/*  />*/}
      {/*  <button onClick={addTask}>+</button>*/}
      {/*  {error && <div className={'error-message'}>{error}</div>}*/}
      {/*</div>*/}
      <ul style={{listStyle: "none", padding: "0"}}>
        {tasks}
      </ul>
      <div style={{textAlign: "center"}}>
        {/*<ButtonGroup size={"small"} color={"primary"} >*/}
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
        {/*</ButtonGroup>*/}
      </div>
    </div>

  );
}


export default TodoList