import React, { FC, ReactNode } from 'react'
import useStore from './useStore';
export interface FormProps {
  name?: string;
  children?: ReactNode;
}

export const Form: FC<FormProps> = (props) => {
  const { name, children } = props
  const { form, fields } = useStore()
  return (
    <>
      <form name={name} className="viking-form">
        {children}
      </form>
      <div>
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(fields)}</pre>
        <pre style={{whiteSpace: 'pre-wrap'}}>{JSON.stringify(form)}</pre>
      </div>
    </>

  )
}
Form.defaultProps = {
  name: 'viking_form'
}

export default Form
