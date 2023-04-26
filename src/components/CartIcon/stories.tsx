import { Story, Meta } from '@storybook/react'
import CartIcon from '.'

export default {
  title: 'CartIcon',
  component: CartIcon,
  parameters: {
    backgrounds: {
      default: 'won-dark'
    }
  }
} as Meta

export const Default: Story = (args) => <CartIcon {...args} />

export const withItems: Story = (args) => <CartIcon {...args} />

withItems.args = {
  quantity: 3
}
