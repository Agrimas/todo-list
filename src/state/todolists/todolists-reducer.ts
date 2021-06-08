import {stateTaskType, TodolistType} from '../../App';
import {v1} from 'uuid';

type ActionType =
    addTodolistActionType
    | removeTodolistActionType
    | changeTitleTodolistActionType
    | changeTodolistFilterActionType

export const todolistsReducer = (state: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case 'REMOVE-TODOLIST':
            return [...state.filter((todoList) => todoList.id !== action.id)]
        case 'ADD-TODOLIST':
            const newTodolist = {
                id: v1(),
                title: action.title,
                filter: 'all'
            } as TodolistType
            return [...state, newTodolist]
        case 'CHANGE-TODOLIST-TITLE':
            const changedTodolist = state.find((todoList) => todoList.id === action.id);
            if (changedTodolist) {
                changedTodolist.title = action.title;
                return [...state];
            }
            return state;
        case 'CHANGE-TODOLIST-FILTER':
            let todoList = state.find(todoList => todoList.id === action.id);
            if (todoList) {
                todoList.filter = action.filter;
                return [...state];
            }
            return state;
        default:
            return state;
    }
}

type removeTodolistActionType = {
    type: 'REMOVE-TODOLIST'
    id: string
}
export const removeTodolistAC = (id: string): removeTodolistActionType => {
    return {
        type: 'REMOVE-TODOLIST',
        id
    }
}

type addTodolistActionType = {
    type: 'ADD-TODOLIST'
    title: string
}
export const addTodolistAC = (title: string): addTodolistActionType => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}

type changeTitleTodolistActionType = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    id: string
}
export const changeTitleTodolistAC = (id: string, title: string): changeTitleTodolistActionType => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        id
    }
}

type changeTodolistFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER',
    id: string,
    filter: stateTaskType
}
export const changeTodolistFilterAC = (id: string, filter: stateTaskType): changeTodolistFilterActionType => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        id,
        filter
    }
}