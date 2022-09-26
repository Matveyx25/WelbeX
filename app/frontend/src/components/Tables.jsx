import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { requestTables } from '../redux/tables-reducers'
import { FilterContainer } from './common/Filter'
import { Paginator } from './common/Paginator'

const Tables = ({requestTables, tables, pages, isFetching}) => {
    const [page, setPage] = useState(0)

    useEffect(() => {
        requestTables(page)
    }, [page])


  return (
    <div className='container'>
        <h1 className='title'>Таблица</h1>
        <FilterContainer page={page}/>
        <table className='table-wrapper'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Amount</th> 
                    <th>Distance</th>
                    <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {isFetching ? <tr><td>Loading...</td></tr> : 
                    <>
                    {tables.length ? <>
                    {tables.map(el => (
                        <tr key={el.id}>
                            <td>{el.name}</td>
                            <td>{el.amount}</td> 
                            <td>{el.distance}</td> 
                            <td>{(el.date)}</td> 
                        </tr>
                    ))} </> : <tr><td><p className='error'>Таких данных нет</p></td></tr>}
                    </>
                }
            </tbody>
        </table>
        <Paginator pages={pages} page={page} pressHandler={(i) => setPage(i)}/>
        
    </div>
  )
}

const mapStateToProps = (state) => ({
    tables: state.tables.tables,
    pages: state.tables.pages,
    isFetching: state.tables.isFetching
})

export const TablesContainer = connect(mapStateToProps, {requestTables})(Tables)