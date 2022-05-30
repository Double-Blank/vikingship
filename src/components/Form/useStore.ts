import { useState, useReducer } from 'react'
export interface FieldDetail {
  name: string;
  value: string;
  rules: any[];
  isValid: boolean;
  errors: any[];
}

export interface FieldsState {
  [key: string]: FieldDetail
}

export interface FormState {
  isValid: boolean;
}
export interface FieldsAction {
  type: 'addField' | 'updateValue';
  name: string;
  value: any;
}
function fieldsReducer(state: FieldsState, action: FieldsAction): FieldsState {
  switch (action.type) {
    case 'addField':
      return {
        ...state,
        [action.name]: { ...action.value }
      }
    case 'updateValue':
      return {
        ...state,
        [action.name]: { ...state[action.name], value: action.value }
      }
    default:
      return state;
  }
}
// * react hooks
// * class - ant design

function useStore() {
  // form state
  const [ form, setForm ] = useState<FormState>({ isValid: true })
  const [ fields, dispatch ] = useReducer(fieldsReducer, {})
  return {
    fields,
    dispatch,
    form
  }
}

export default useStore