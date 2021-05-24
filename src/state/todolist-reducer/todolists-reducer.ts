import {todolistAPI, TodolistType} from "../../api/todolist-api";
import {Dispatch} from "redux";

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>

export type ActionsType = RemoveTodolistActionType |
    AddTodolistActionType | ReturnType<typeof changeTodolistTitleAC> |
    ReturnType<typeof changeTodolistFilterAC> | SetTodolistsActionType

export type FilterValuesType = "all" | "completed" | "active"

export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state: TodolistDomainType[] = initialState, action: ActionsType): Array<TodolistDomainType> => {
   switch (action.type) {
       case 'REMOVE-TODOLIST':
           return state.filter(tl => tl.id !== action.id)
       case 'ADD-TODOLIST':
           return [...state, {...action.todolist, filter: "all"}]
       case 'CHANGE-TODOLIST-TITLE':
           return state.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
       case 'CHANGE-TODOLIST-FILTER':
           return state.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
       case 'SET-TODOLISTS':
           return action.todolists.map(tl => ({...tl, filter: "all"}))
       default:
           return state
       //   throw new Error("I don't understand this action type")
   }
}

export const removeTodolistAC = (todolistId: string) => ({type: 'REMOVE-TODOLIST', id: todolistId} as const)
export const addTodolistAC = (todolist: TodolistType) => ({type: 'ADD-TODOLIST', todolist} as const)
export const changeTodolistTitleAC = (id: string, title: string) => ({type: 'CHANGE-TODOLIST-TITLE', id, title} as const)
export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) => ({
    type: 'CHANGE-TODOLIST-FILTER',
    id,
    filter
} as const)
export const setTodolistsAC = (todolists: TodolistType[]) => ({type: 'SET-TODOLISTS', todolists} as const)


// Thunk Creators
export const fetchTodolistsTC = () => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.getTodolist()
        .then(res => {
            const action = setTodolistsAC(res.data)
            dispatch(action)
        })
}

export const removeTodolistTC = (todolistId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTodolist(todolistId)
        .then(res => {
            const action = removeTodolistAC(todolistId)
            dispatch(action)
        })
}

export const addTodolistTC = (title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTodolist(title)
        .then(res => {
            const action = addTodolistAC(res.data.data.item)
            dispatch(action)
        })
}

export const changeTodolistTitleTC = (todolistId: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(todolistId, title)
        .then(res => {
            const action = changeTodolistTitleAC(todolistId, title)
            dispatch(action)
        })
}
