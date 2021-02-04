import axios from "axios";

const settings = {
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
    'API-KEY': '743b3333-0516-4a4e-806b-b8ecd2b160d7'
  }

}
const instance = axios.create(
  {
    ...settings
  },
)
type TodolistType ={
  "id": string,
  "title": string,
  "addedDate": string,
  "order": number
}
type BAseResponceType<D={}> ={
  resultCode: number
  fieldErrors: Array<string>
  messages: Array<string>,
  data: D
}


export const todolistAPI = {
  updateTodolist(todolistId: string, title: string) {
    return instance.put<BAseResponceType>(`todo-lists/${todolistId}`, {title})
  },
  deleteTodolist(todolistId: string) {
    return instance.delete<BAseResponceType>(`todo-lists/${todolistId}`)
  },
  createTodolist(title: string) {
    return instance.post<BAseResponceType<{item: TodolistType}>>(`todo-lists`, {title})
  },
  getTodolists() {
    return instance.get<Array<TodolistType>>(`todo-lists`)

  }
}