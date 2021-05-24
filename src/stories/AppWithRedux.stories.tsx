import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';
import AppWithRedux from '../app/App';
import {ReduxStoreProviderDecorator} from "./ReduxStoreProviderDecorator";

export default {
    title: 'Todolist/AppWithRedux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator],
    argTypes: {},
} as Meta;

const Template: Story = (args) => <AppWithRedux {...args} />;

export const AppWithReduxExample = Template.bind({});
AppWithReduxExample.args = {}
