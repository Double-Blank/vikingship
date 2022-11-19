import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import Button from './button'

// https://github.com/storybookjs/storybook/issues/15574
export default {
  title: '第四章：Button',
  component: Button,
} as ComponentMeta<typeof Button>

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />

export const ADefault = Template.bind({})
ADefault.args = {
  children: 'Default Button',
}
ADefault.storyName = '默认按钮样式'
export const BButtonWithSize = () => (
  <>
    <Button size="lg"> large button </Button>
    <Button size="sm"> small button </Button>
  </>
)
BButtonWithSize.storyName = '不同尺寸的按钮'

export const CButtonWithType = () => (
  <>
    <Button btnType="primary"> primary button </Button>
    <Button btnType="danger"> danger button </Button>
    <Button btnType="link" href="https://google.com"> link button </Button>
  </>
)

CButtonWithType.storyName = '不同类型的按钮'