import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TaskType} from "./App";

type PropsType = {
  id: string
  title: string
  tasks: Array<TaskType>
  filter: FilterValuesType
  removeTodoList: (todoListID:string)=>void
  addTask: (title: string,todoListID: string) => void
  removeTask: (taskId: string,todoListID: string) => void
  changeFilter: (filterValue: FilterValuesType,todoListID: string) => void
  changeStatus: (taskId: string, isDone: boolean,todoListID: string) => void
}


function TodoList(props: PropsType) {

  const [title, setTitle] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const tasks = props.tasks.map(taskObj => {
    const removeTask = () => {
      props.removeTask(taskObj.id , props.id)
    }
    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
      props.changeStatus(taskObj.id, e.currentTarget.checked,props.id)
    }
    return (
      <li key={taskObj.id} className={taskObj.isDone ? "is-done" : ""}>
        <input
          onChange={changeStatus}
          type="checkbox"
          checked={taskObj.isDone}/>
        <span>{taskObj.title}</span>
        <button onClick={removeTask}>x</button>

      </li>
    )
  })

  function addTask() {
    const trimmedTitle = title.trim()
    if (trimmedTitle) {
      props.addTask(trimmedTitle,props.id)
    } else {
      setError("Title is required!")
    }
    setTitle("")
  }

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
    setError(null)
  }
  const onKeyPressEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") addTask()
  }
  const onAllClickHandler = () => {
    props.changeFilter("all",props.id)
  }
  const onActiveClickHandler = () => {
    props.changeFilter("active",props.id)
  }
  const onCompletedClickHandler = () => {
    props.changeFilter("completed",props.id)
  }
  const removeTodoList = ()=>{props.removeTodoList(props.id)}
  return (
    <div>
      <h3 className={error ? "error-message" : ""}>{props.title}<button onClick={removeTodoList}>x</button></h3>
      <div>
        <input
          value={title}
          onChange={onChangeHandler}
          onKeyPress={onKeyPressEnter}
          className={error ? "error" : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className={'error-message'}>{error}</div>}
      </div>
      <ul>
        {tasks}
      </ul>
      <div>
        <button
          className={props.filter === "all" ? "active-filter" : ""}
          onClick={onAllClickHandler}>All
        </button>
        <button
          className={props.filter === "active" ? "active-filter" : ""}

          onClick={onActiveClickHandler}>Active
        </button>
        <button
          className={props.filter === "completed" ? "active-filter" : ""}

          onClick={onCompletedClickHandler}>Completed
        </button>
      </div>
    </div>

  );

}

export default TodoList