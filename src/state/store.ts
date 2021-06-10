import {combineReducers, createStore} from 'redux';
import {todolistsReducer} from './todolists/todolists-reducer';
import {tasksReducer} from './tasks/tasks-reducer';

const reducers = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const Store = createStore(reducers);

export type storeType = typeof Store;
export type rootStateType = ReturnType<typeof Store.getState>;