import React, { FC, ReactNode } from 'react'
import classNames from 'classnames'

export interface FormItemProps {
  label?: string;
  children?: ReactNode;
}

const FormItem: FC<FormItemProps> = (props) => {
  const {     
    label,
    children
  } = props
  const rowClass = classNames('viking-row', {
    'viking-row-no-label': !label
  })
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