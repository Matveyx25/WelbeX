import thunkMiddlewere from "redux-thunk"
import {
    applyMiddleware,
    combineReducers,
    compose,
    createStore } from "redux";
import { tablesReducer } from "./tables-reducers";

const reducers = combineReducers({
    tables: tablesReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddlewere)
))

window.store = store