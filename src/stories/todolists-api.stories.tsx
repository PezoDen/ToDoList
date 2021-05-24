import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";

export default {
    title: 'API'
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        // здесь мы будем делать запрос и ответ закидывать в стейт.
        // который в виде строки будем отображать в div-ке
        todolistAPI.getTodolist()
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const title = "newTodolist"
          todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "89a48d99-154d-4dc4-97fd-9e63468ffd60"
       todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = "28fa14d1-d4a9-47e4-9fb6-1482ff1312a6"
        todolistAPI.updateTodolist(todolistId, 'Some New Title')
            .then((res) => {
                setState(res.data)
            })
    }, [])

    return <div> {JSON.stringify(state)}</div>
}
export const GetTask = () => {

    const [state,setState] = useState<any>(null)
    const [todolistId,setTodolistId] = useState<string>("")

   const getTasks = () => {
       todolistAPI.getTask(todolistId)
           .then((res) => {
               setState(res.data.items)
           })
   }


    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId}
        onChange={(e) => {
            setTodolistId(e.currentTarget.value)
        }}
        />
        <button onClick={getTasks}>get tasks</button>
    </div>
    </div>
}

export const DeleteTask = () => {
    const [state,setState] = useState<any>(null)
    const [taskId,setTaskId] = useState<string>("")
    const [todolistId,setTodolistId] = useState<string>("")

   const deleteTask = () => {
        todolistAPI.deleteTask(todolistId,taskId)
            .then((res) => {
                setState(res.data)
            })
   }

    return <div>{JSON.stringify(state)}
    <div>
        <input placeholder={"todolistId"} value={todolistId}
               onChange={(e) => {
                   setTodolistId(e.currentTarget.value)
               }}
        />
        <input placeholder={"taskId"} value={taskId}
               onChange={(e) => {
                   setTaskId(e.currentTarget.value)
               }}
        />
        <button onClick={deleteTask}> delete task</button>
    </div>
    </div>
}

export const CreateTask = () => {
    const [state,setState] = useState<any>(null)
    const [taskTitle,setTaskTitle] = useState<string>("")
    const [todolistId,setTodolistId] = useState<string>("")

    const createTask = () => {
        todolistAPI.createTask(todolistId,taskTitle)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input placeholder={"Task title"} value={taskTitle}
                   onChange={(e) => {
                       setTaskTitle(e.currentTarget.value)
                   }}
            />
            <button onClick={createTask}> create task</button>
        </div>
    </div>
}

export const UpdateTask = () => {
    const [state,setState] = useState<any>(null);
    const [title,setTitle] = useState<string>("title 1");
    const [description,setDescription] = useState<string>("description 1");
    const [status,setStatus] = useState<number>(0);
    const [priority,setPriority] = useState<number>(0);
    const [startDate,setStartDate] = useState<string>("");
    const [deadline,setDeadline] = useState<string>("");
    const [todolistId,setTodolistId] = useState<string>("")
    const [taskId,setTaskId] = useState<string>("")

    const updateTask = () => {
        todolistAPI.updateTask(taskId, {
            deadline: "",
            description: description,
            priority: priority,
            startDate: "",
            status: status,
            title: title
        }, todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>{JSON.stringify(state)}
        <div>
            <input placeholder={"taskId"} value={taskId}
                   onChange={(e) => {
                       setTaskId(e.currentTarget.value)
                   }}
            />
            <input placeholder={"todolistId"} value={todolistId}
                   onChange={(e) => {
                       setTodolistId(e.currentTarget.value)
                   }}
            />
            <input placeholder={"Task title"} value={title}
                   onChange={(e) => {
                       setTitle(e.currentTarget.value)
                   }}
            />
            <input placeholder={"Description"} value={description}
                   onChange={(e) => {
                       setDescription(e.currentTarget.value)
                   }}
            />
            <input placeholder={"status"} value={status}
                   type={"number"}
                   onChange={(e) => {
                       setStatus(+e.currentTarget.value)
                   }}
            />
            <input placeholder={"priority"} value={priority}
                   type={"number"}
                   onChange={(e) => {
                       setPriority(+e.currentTarget.value)
                   }}
            />
            <button onClick={updateTask}>update task</button>
        </div>
    </div>
}