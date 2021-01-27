import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import {PropsType, Task} from "../Task";
import {ReduxStoreProviderDecorator} from "./decoratos/ReduxStoreProviderDecorator";

export default {
  title: 'Todolists/Task',
  component: Task,
  argTypes: {},
  decorators:[ReduxStoreProviderDecorator]
} as Meta;



const Template: Story<PropsType> = (args) => <Task {...args} />;


export const TaskIsDoneExample = Template.bind({});
TaskIsDoneExample.args = {
  taskId: '1',
  todolistId: "2"
}
export const TaskNotIsDoneExample = Template.bind({});
TaskNotIsDoneExample.args = {
  taskId: '1',
  todolistId: "2"
}
//
// import React from 'react';
// // also exported from '@storybook/react' if you can deal with breaking changes in 6.1
// import {Meta, Story} from '@storybook/react/types-6-0';
// import {action} from "@storybook/addon-actions";
// import {Task, PropsType} from "../Task";
//
// export default {
//   title: 'Todolists/Task',
//   component: Task,
//   argTypes: {},
//   args: {
//     removeTask: action('Title changed inside Task'),
//     changeTaskStatus: action('Remove button inside Task clicked'),
//     changeTaskTitle: action('Status changed inside Task'),
//   },
// } as Meta;
//
// const Template: Story<PropsType> = (args) => <Task {...args} />;
//
// export const TaskIsDoneExample = Template.bind({});
//
// TaskIsDoneExample.args = {
//   task: {id: "1", isDone: true, title: "JS"},
//   todolistId: "1"
// }
// export const TaskIsNotDoneExample = Template.bind({});
// TaskIsNotDoneExample.args = {
//   task: {id: "2", isDone: false, title: "HTML"},
//   todolistId: "2"
// }