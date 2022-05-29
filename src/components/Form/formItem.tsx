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
  const { dispatch } = useContext(FormContext)
  const rowClass = classNames('viking-row', {
    'viking-row-no-label': !label
  })
  useEffect(() => {
    dispatch({ type: 'addField', name, value: { label, name }})
  }, [])
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
        {children}
      </div>
    </div>
  )
}

export default FormItem