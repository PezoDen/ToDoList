import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Meta, Story} from '@storybook/react/types-6-0';

import {action} from "@storybook/addon-actions";
import {EditableSpan, EditableSpanPropsType} from "../components/EditableSpan/EditableSpan";

export default {
    title: 'Todolist/EditableSpan',
    component: EditableSpan,
    argTypes: {
        backgroundColor: { control: 'color' },
        onChange: {
            description: 'Value EditableSpan changed'
        },
        value: {
            defaultValue: 'HTML',
            description: 'Start value EditableSpan'
        }
    },
} as Meta;

const Template: Story<EditableSpanPropsType> = (args) => <EditableSpan {...args} />;

export const EditableSpanExample = Template.bind({});
EditableSpanExample.args = {
    onChange: action('Value EditableSpan changed'),
    title: 'HTML'
}
