import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import useDebounce from '../../hooks/useDebounce'
interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  onSelect?: (item: DataSourceType) => void;
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {
  const {
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [ inputValue, setInputValue ] = useState(value as string)
  const [ suggestions, setSugestions ] = useState<DataSourceType[]>([])
  const [ loading, setLoading ] = useState(false)
  const [ highlightIndex, setHighlightIndex] = useState(-1)
  const debouncedValue = useDebounce(inputValue, 500)
  useEffect(() => {
    if (debouncedValue) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) {
        console.log('triggered')
        setLoading(true)
        results.then(data => {
          setLoading(false)
          setSugestions(data)
        })
      } else {
        setSugestions(results)
      }
    } else {
      setSugestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue])
  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    setHighlightIndex(index)
  }
  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch(e.keyCode) {
      case 13:
        if (suggestions[highlightIndex]) {
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38:
        highlight(highlightIndex - 1)
        break
      case 40:
        highlight(highlightIndex + 1)
        break
      case 27:
        setSugestions([])
        break
      default:
        break
    }
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSugestions([])
    if (onSelect) {
      onSelect(item)
    }
  }
  const renderTemplate = (item: DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }
  const generateDropdown = () => {
    return (
      <ul>
        {suggestions.map((item, index) => {
          const cnames = classNames('suggestion-item', {
            'item-highlighted': index === highlightIndex
          })
          return (
            <li key={index} className={cnames} onClick={() => handleSelect(item)}>
              {renderTemplate(item)}
            </li>
          )
        })}
      </ul>
    )
  }
  return (
    <div className="viking-auto-complete">
      <Input
        value={inputValue}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        {...restProps}
      />
      { loading && <ul><Icon icon="spinner" spin /></ul>}
      { (suggestions.length > 0) && generateDropdown()}
    </div>
  )
}

