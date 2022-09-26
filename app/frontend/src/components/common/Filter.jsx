import { useCallback, useEffect, useState } from 'react'
import { connect } from 'react-redux';
import { requestTables } from '../../redux/tables-reducers'

const Filter = ({requestTables, page}) => {
    const [column, setColumn] = useState('name')
    const [condition, setCondition] = useState('=')
    const [value, setValue] = useState('')



  return (
    <div className='filter-wrapper'>
        <select className="form-select" value={column} onChange={(event) => {
                setColumn(event.target.value)
            }}>
            <option value="name">Name</option>
            <option value="amount">Amount</option>
            <option value="distance">Distance</option>
        </select>
        <select className="form-select" value={condition} onChange={(event) => {
            setCondition(event.target.value)
        }}>
            <option value="=">Равно</option>
            {column == 'name' && <option value="like">Содержит</option>}
            <option value=">">Больше</option>
            <option value="<">Меньше</option>
        </select>
        <input  type="text" 
                placeholder='value' 
                value={value}
                onChange={(event) => {
                    setValue(event.target.value)
                }}/>
        <button onClick={() => requestTables(page, column, condition, value)}>Поиск</button>
    </div>
  )
}

export const FilterContainer = connect(null, {requestTables})(Filter)