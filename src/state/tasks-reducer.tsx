import {TaskStateType} from "../App";
import {v1} from "uuid";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";


export type RemoveTaskActionType = {
  type: "REMOVE-TASK"
  taskId: string
  todolistId: string
}
export type AddTaskActionType = {
  type: "ADD-TASK"
  todolistId: string
  tasksTitle: string
}
export type ChangeStatusActionType = {
  type: "CHANGE-TASK"
  taskId: string
  todolistId: string
  isDone: boolean
}
export type ChangeTitleActionType = {
  type: "CHANGE-TITLE"
  taskId: string
  todolistId: string
  title: string
}

const initialState: TaskStateType = {}

type ActionType =
  RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusActionType
  | ChangeTitleActionType
  | AddTodoListActionType
  | RemoveTodoListActionType


export const tasksReducer = (state: TaskStateType = initialState, action: ActionType): TaskStateType => {
  switch (action.type) {
    case "REMOVE-TASK" : {
      let copyState = {...state}
      copyState[action.todolistId] = copyState [action.todolistId].filter(task => task.id !== action.taskId)
      return copyState
    }
    case "ADD-TASK": {
      let copyState = {...state}
      let task = {id: v1(), isDone: false, title: action.tasksTitle}
      copyState[action.todolistId] = [task, ...copyState[action.todolistId]]
      return copyState
    }
    case "CHANGE-TASK": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => {
          if (task.id !== action.taskId) {
            return task
          } else {
            return {...task, isDone: action.isDone}
          }
        })
      }
    }
    case "CHANGE-TITLE": {
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].map(task => {
          if (task.id !== action.taskId) {
            return task
          } else {
            return {...task, title: action.title}
          }
        })
      }
    }
    case 'ADD_TODOLIST': {
      return {
        ...state,
        [action.todolistId]: []
      }
    }
    case 'REMOVE_TODOLIST': {
      let copyState = {...state}
      delete copyState[action.todoListID]
      return copyState
    }

    default:
      return state

  }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
  return {type: 'REMOVE-TASK', taskId: taskId, todolistId: todolistId}
}
export const addTaskAC = (tasksTitle: string, todolistId: string): AddTaskActionType => {
  return {type: 'ADD-TASK', tasksTitle: tasksTitle, todolistId: todolistId}
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string): ChangeStatusActionType => {
  return {type: 'CHANGE-TASK', taskId: taskId, isDone: isDone, todolistId: todolistId}
}
export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTitleActionType => {
  return {type: "CHANGE-TITLE", taskId: taskId, title: title, todolistId: todolistId}
}


