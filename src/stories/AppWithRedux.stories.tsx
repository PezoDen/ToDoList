import React from 'react';
// also exported from '@storybook/react' if you can deal witл
//
// h breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';

import {Button, ButtonProps} from './Button';

import {action} from "@storybook/addon-actions";
import AddItemForm, { AddItemFormPropsType } from "../AdditemForm";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "./decoratos/ReduxStoreProviderDecorator";

export default {
  title: 'Todolists/AppWithRedux',
  component: AppWithRedux,
  decorators: [ReduxStoreProviderDecorator],
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;


export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {
};
