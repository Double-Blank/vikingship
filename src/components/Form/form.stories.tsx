import React from 'react'
import { ComponentMeta } from '@storybook/react'
import Form from './form'
import Item from './formItem'
import Input from '../Input'
import Button from '../Button'

const meta: ComponentMeta<typeof Form> ={ 
  title: 'Form 组件',
  id: 'Form',
  component: Form,
  subcomponents: { 'Item': Item },
  decorators: [
    (Story) => (
      <div style={{ width: '550px' }}>
        <Story />
      </div>
    ),
  ],
}
export default meta

export const BasicForm = () => {
  return (
    <Form>
      <Item label='用户名' >
        <Input/>
      </Item>
      <Item label='密码'>
        <Input type='password'/>
      </Item>
      <Item>
        <Input placeholder='no-label' />
      </Item>
      <div className='agreement-section' style={{ 'display': 'flex', 'justifyContent': 'center'}}>
        <Item>
          <input type="checkbox"/>
        </Item>
        <span className="agree-text">注册即代表你同意<a href='#'>用户协议</a></span>
      </div>
      <div className='viking-form-submit-area'>
        <Button type="submit" btnType='primary'>登陆</Button>
      </div>
    </Form>
  )
}
