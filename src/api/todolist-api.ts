import axios from 'axios'

const settings = {
    withCredentials: true,
    headers: {
        'API-KEY': '743b3333-0516-4a4e-806b-b8ecd2b160d7'
    }
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    ...settings
})

export const todolistAPI = {
    getTodolist(){
        return instance.get<TodolistType[]>('todo-lists')
    },
    createTodolist(title: string){
        return instance.post<ResponseType<{item: TodolistType}>>(`todo-lists`,{title})
    },
    deleteTodolist(todolistId: string){
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`, {title})
    },
    getTask(todolistId: string){
        return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks` )
    },
    createTask(title: string, todolistId: string) {
        return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title})
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(taskId: string, model: UpdateTaskModelType, todolistId: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`, model)
    }
}


// TYPES
export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: string[]
    data: D
}

export type GetTasksResponse = {
    error: string | null
    totalCount: number
    items: TaskType[]
}

export type TaskType = {
    description: string
    title: string
    status: TaskStatuses
    priority: Priorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type  UpdateTaskModelType = {
    description: string
    title: string
    status: number
    priority: number
    startDate: string
    deadline: string
}

export enum TaskStatuses  {
    New = 0,
    InProgress= 1,
    Completed = 2,
    Draft= 3
}

export enum Priorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}