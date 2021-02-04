import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import AddItemForm, {AddItemFormPropsType} from "../AdditemForm";

export default {
  title: 'Todolists/AddItemForm',
  component: AddItemForm,
  argTypes: {},
} as Meta;

const Template: Story<AddItemFormPropsType> = (args) => <AddItemForm {...args} />;


export const AddItemFormExample = Template.bind({});
AddItemFormExample.args = {
  addItem: action("Button inside clicked")
};
