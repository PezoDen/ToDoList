import {tasksReducer} from "./tasks-reducer";
import {TaskStateType, TodoListType} from "../App";
import {AddTodolistAC, todoListsReducer} from "./todolists-reducer";

test('ids should be equals', () => {
  const startTasksState: TaskStateType = {};
  const startTodolistsState: Array<TodoListType> = [];

  const action = AddTodolistAC("new todolist");

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todoListsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.todolistId);
  expect(idFromTodolists).toBe(action.todolistId);
});

