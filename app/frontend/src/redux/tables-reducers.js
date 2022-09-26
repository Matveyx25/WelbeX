import { tablesAPI } from "../api"

// consts
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'
const SET_TABLES = 'SET_TABLES'
const SET_PAGES = "SET_PAGES"

let initialState = {
    tables: [],
    isFetching: false,
    pages: null
}

// reducers
export const tablesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TABLES: 
            return {...state, tables: action.tables}
        case SET_PAGES: 
            return {...state, pages: action.pages}
        case TOGGLE_IS_FETCHING: 
            return {...state, isFetching: action.isFetching}
        default: 
            return state
    }
}

// dispatches
const setTables = (tables) => ({ type: SET_TABLES, tables })
const setPages = (pages) => ({ type: SET_PAGES, pages })
const toggleIsFetching = (isFetching) => ({ type: TOGGLE_IS_FETCHING, isFetching })

export const requestTables = (page, column = null, condition = null, value = null) => async (dispatch) => {
    dispatch(toggleIsFetching(true))
    let response = []
    if(column && condition && value){
        response = await tablesAPI.getFiltered(page, column, condition, value)
    }else{
        response = await tablesAPI.getTables(page)
    }
    if(response.status === 200){
        dispatch(setTables(response.data.data))
        dispatch(setPages(response.data.pages))
        dispatch(toggleIsFetching(false))
    }else{
        console.log(response);
        dispatch(toggleIsFetching(false))
    }
}