import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";


export type RemoveTodoListActionType = {
  type: "REMOVE_TODOLIST"
  todoListID: string
}
export type AddTodoListActionType = {
  type: "ADD_TODOLIST"
  title: string
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

type ActionType = RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListTitleType | ChangeTodoListFilterType


export const todoListsReducer = (state: Array<TodoListType>, action: ActionType) => {
  switch (action.type) {
    case "REMOVE_TODOLIST" :
      return state.filter(tl => tl.id !== action.todoListID)
    case "ADD_TODOLIST":
      const newTodoListID = v1()
      const newTodoList: TodoListType = {
        id: newTodoListID,
        title: action.title,
        filter: "all"
      }
      return [...state, newTodoList]
    case  "CHANGE_TODOLIST_TITLE":
      const todoList = state.find(tl => tl.id === action.todoListID)
      if (todoList) {
        todoList.title = action.title
        return ([...state])
      }
      return state
    case  "CHANGE_TODOLIST_FILTER": {
      const todoList = state.find(tl => tl.id === action.todoListID)
      if (todoList) {
        todoList.filter = action.filter
        return ([...state])
      }
      return state
    }
    default:
      return state

  }

}