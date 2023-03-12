import { Story, Meta } from '@storybook/react'
import { AddShoppingCart } from 'styled-icons/material-outlined'

import Button, { ButtonProps } from '.'

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    children: {
      type: 'string'
    },
    icon: {
      control: {
        type: ''
      }
    }
  }
} as Meta

export const Default: Story<ButtonProps> = (args) => <Button {...args} />

Default.args = {
  children: 'Buy now'
}

export const withIcon: Story<ButtonProps> = (args) => <Button {...args} />

withIcon.args = {
  size: 'small',
  children: 'Buy now',
  icon: <AddShoppingCart />
}
