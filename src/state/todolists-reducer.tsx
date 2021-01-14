import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
  type: "REMOVE_TODOLIST"
  todoListID: string
}
export type AddTodoListActionType = {
  type: "ADD_TODOLIST"
  title: string
  todolistId: string
}
export type ChangeTodoListTitleType = {
  type: "CHANGE_TODOLIST_TITLE"
  title: string
  todoListID: string
}
export type ChangeTodoListFilterType = {
  type: "CHANGE_TODOLIST_FILTER"
  filter: FilterValuesType
  todoListID: string
}

const initialState: Array<TodoListType> = []

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleType | ChangeTodoListFilterType


export const todoListsReducer = (state: Array<TodoListType> = initialState, action: ActionType) => {
  switch (action.type) {
    case "REMOVE_TODOLIST" :
      return state.filter(tl => tl.id !== action.todoListID)
    case "ADD_TODOLIST":
      const newTodoList: TodoListType = {
        id: action.todolistId,
        title: action.title,
        filter: "all"
      }
      return [...state, newTodoList]
    case  "CHANGE_TODOLIST_TITLE": {
      const todoList = state.find(tl => tl.id === action.todoListID)
      if (todoList) {
        todoList.title = action.title
        return ([...state])
      } else return state
    }
    case "CHANGE_TODOLIST_FILTER": {
      const todoList = state.find(tl => tl.id === action.todoListID)
      if (todoList) {
        todoList.filter = action.filter
        return ([...state])
      } else return state
    }
    default:
      return state
  }
}
export const RemoveTodolistAC = (todolistId: string): RemoveTodoListActionType => {
  return {type: 'REMOVE_TODOLIST', todoListID: todolistId}
}

export const AddTodolistAC = (title: string): AddTodoListActionType => {
  return {type: 'ADD_TODOLIST', title: title, todolistId: v1()}
}
export const ChangeTodolistTitleAC = (todolistId: string, title: string): ChangeTodoListTitleType => {
  return {type: 'CHANGE_TODOLIST_TITLE', todoListID: todolistId, title: title}
}
export const ChangeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodoListFilterType => {
  return {type: 'CHANGE_TODOLIST_FILTER', filter: filter, todoListID: todolistId}
}


