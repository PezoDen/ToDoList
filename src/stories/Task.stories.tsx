import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {Task, TaskPropsType} from "../components/Task/Task";
import {Priorities, TaskStatuses} from "../api/todolist-api";

export default {
    title: 'Todolist/Task',
    component: Task,
    argTypes: {
        backgroundColor: {control: 'color'},
    },
} as Meta;

const changeTaskStatusCallback = action('Status changed inside Task')
const changeTaskTitleCallback = action('Title changed inside Task')
const removeTaskCallback = action('Remove button  inside Task clicked')

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

const baseArgs = {
    changeTaskStatus: changeTaskStatusCallback,
    changeTaskTitle: changeTaskTitleCallback,
    removeTask: removeTaskCallback
}

export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
    ...baseArgs,
    task: {
        id: '1', status: TaskStatuses.Completed, title: 'JS', addedDate: "", deadline: "",
        priority: Priorities.Low, startDate: "", todoListId: "todolistId1", description: "", order: 0
    },
    todolistId: 'todolistId1'
}

export const TaskIsNotDoneExample = Template.bind({});
TaskIsNotDoneExample.args = {
    ...baseArgs,
    task: {
        id: '1', status: TaskStatuses.New, title: 'JS', addedDate: "", deadline: "",
        priority: Priorities.Low, startDate: "", todoListId: "todolistId1", description: "", order: 0
    },
    todolistId: 'todolistId1'
}