import {addTaskAC, removeTaskAC, setTasksAC, tasksReducer, updateTaskAC} from './tasks-reducer';
import {addTodolistAC, removeTodolistAC, setTodolistsAC} from "../todolist-reducer/todolists-reducer";
import {TasksStateType} from "../../app/App";
import {Priorities, TaskStatuses} from "../../api/todolist-api";

let startState: TasksStateType = {};
beforeEach(() => {
    startState = {
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            },
            {
                id: "2", title: "milk", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            }
        ]
    }
})


test('correct task should be deleted from correct array', () => {

    const action = removeTaskAC("2", "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {
                id: "1", title: "CSS", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: "2", title: "JS", status: TaskStatuses.Completed, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            },
            {
                id: "3", title: "React", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId1",
                description: "", order: 0
            }
        ],
        "todolistId2": [
            {
                id: "1", title: "bread", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            },
            {
                id: "3", title: "tea", status: TaskStatuses.New, addedDate: "", deadline: "",
                priority: Priorities.Low, startDate: "", todoListId: "todolistId2",
                description: "", order: 0
            }
        ]
    });

});

test('correct task should be added to correct array', () => {

    const action = addTaskAC({
        title: "juice", addedDate: "", deadline: "", status: TaskStatuses.New, id: "id exists",
        priority: Priorities.Low, startDate: "", todoListId: "todolistId2", description: "", order: 0
    });

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("juice");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
})

test('status of specified task should be changed', () => {

    const action = updateTaskAC("2", {status: TaskStatuses.New}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBeFalsy();
    expect(endState["todolistId1"][1].status).toBeTruthy();
});

test('title of specified task should be changed', () => {

    const action = updateTaskAC("2", {title: "MilkyWay"}, "todolistId2");

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].title).toBe("MilkyWay");
    expect(endState["todolistId1"][1].title).toBe("JS");
});

test('new property with new array should be added when new todolist is added', () => {

    const action = addTodolistAC({
        id: "",
        order: 0,
        addedDate: "",
        title: "new todolist"
    });

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);
    const newKey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
})

test('property with todolistId should be deleted', () => {

    const action = removeTodolistAC("todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});


test('empty arrays should be added when we set todolists', () => {

    const action = setTodolistsAC([
        {id: '1', title: "What to learn", addedDate: "", order: 0},
        {id: '2', title: "What to buy", addedDate: "", order: 0}]);

    const endState = tasksReducer({}, action)

    const keys = Object.keys(endState);

    expect(keys.length).toBe(2);
    expect(endState['1']).toStrictEqual([]);
    expect(endState['2']).toStrictEqual([]);
});

test('tasks should be added for todolist', () => {

    const action = setTasksAC(startState["todolistId1"], "todolistId1")

    const endState = tasksReducer({
        "todolistId2": [],
        "todolistId1": []
    }, action)


    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(0);
});
