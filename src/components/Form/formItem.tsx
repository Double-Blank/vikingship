import React, { FC, ReactNode, useContext, useEffect } from 'react'
import classNames from 'classnames'
import { FormContext } from './form'

export interface FormItemProps {
  name: string;
  label?: string;
  children?: ReactNode;
}

const FormItem: FC<FormItemProps> = (props) => {
  const {     
    label,
    children,
    name
  } = props
  const { dispatch, fields } = useContext(FormContext)
  const rowClass = classNames('viking-row', {
    'viking-row-no-label': !label
  })
  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name, value: '' }})
  }, [])
  // 获取store 对应的 value
  const fieldState = fields[name]
  const value = fieldState && fieldState.value
  const onValueUpdate = (e:any) => {
    const value = e.target.value
    console.log('new value', value)
    dispatch({ type: 'updateValue', name, value })
  }
  // 1 手动的创建一个属性列表，需要有 value 以及 onChange 属性
  const controlProps: Record<string, any> = {}
  controlProps.value = value
  controlProps.onChange = onValueUpdate
  // todo 适应不同的事件以及 value 属性名称
  // 2 获取 children 数组的第一个元素
  const childList = React.Children.toArray(children)
  // todo：判断 children 的类型，显示警告
  const child = childList[0] as React.ReactElement
  // 3 cloneElement，混合这个child 以及 手动的属性列表
  const returnChildNode = React.cloneElement(
    child,
    { ...child.props, ...controlProps }
  )
  return (
    <div className={rowClass}>
      { label &&
        <div className='viking-form-item-label'>
          <label title={label}>
            {label}
          </label>
        </div>
      }
      <div className='viking-form-item'>
        {returnChildNode}
      </div>
    </div>
  )
}

export default FormItem