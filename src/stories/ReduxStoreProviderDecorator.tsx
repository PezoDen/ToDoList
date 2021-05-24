import React from 'react';
import {Provider} from 'react-redux';
import {AppRootStateType} from "../state/store";
import {combineReducers, createStore} from "redux";
import {v1} from "uuid";
import {todolistsReducer} from "../state/todolist-reducer/todolists-reducer";
import {tasksReducer} from "../state/tasks-reducer/tasks-reducer";
import {Priorities, TaskStatuses} from "../api/todolist-api";

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todolistsReducer
})

const initialGlobalState: AppRootStateType = {
    todolists: [
        {id: "todolistId1", title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: "todolistId2", title: "What to buy", filter: "all", addedDate: "", order: 0}
    ],
    tasks: {
        ["todolistId1"]: [
            {
                id: v1(), title: "HTML&CSS", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: v1(), title: "JS", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            }
        ],
        ["todolistId2"]: [
            {
                id: v1(), title: "Milk", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            },
            {
                id: v1(), title: "React Book", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            }
        ]
    }
};

export const storyBookStore = createStore(rootReducer, initialGlobalState);


export const ReduxStoreProviderDecorator = (storyFn: any) => {
    return <Provider store={storyBookStore}>{storyFn()}</Provider>
}