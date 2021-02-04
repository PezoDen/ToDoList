import React, {useEffect, useState} from 'react'
import {todolistAPI} from "../api/todolist-api";
import {Meta} from "@storybook/react/types-6-0";

export default {
  title: 'API'
}  as Meta;

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    // здесь мы будем делать запрос и ответ закидывать в стейт.
    // который в виде строки будем отображать в div-ке
    const promise = todolistAPI.getTodolists()
    promise.then((res) => {
      setState(res.data)
    })

  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const title = 'REACT>>>>>REACT'
    const promise = todolistAPI.createTodolist(title)

    promise.then((res) => {
      setState(res.data.data.item)
    })
  }, [])
  return <div> {JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = 'f8aad5c1-3625-459e-8886-099a00d25712'
    const promise = todolistAPI.deleteTodolist(todolistId)
    promise.then((res) => {
      setState(res.data)
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null)
  useEffect(() => {
    const todolistId = '1de3a659-1057-4792-b50a-56b6a95f8c5e'
    const title = 'qqqqqqqqqqqqqqqqqq'
    const promise = todolistAPI.updateTodolist(todolistId, title)
    promise.then((res) => {
      setState(res.data)
    })
  }, [])

  return <div> {JSON.stringify(state)}</div>
}
