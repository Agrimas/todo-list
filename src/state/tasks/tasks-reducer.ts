import {TasksType} from '../../App';
import {v1} from 'uuid';
import {addTodolistActionType, removeTodolistActionType} from '../todolists/todolists-reducer';

type ActionType =
    addTaskActionType
    | removeTaskActionType
    | changeTaskStatusActionType
    | changeTaskTitleActionType
    | addTodolistActionType
    | removeTodolistActionType

export const tasksReducer = (state: TasksType = {}, action: ActionType): TasksType => {
    debugger
    const todolistID = action.todolistID;
    const todolistTasks = state[todolistID];
    switch (action.type) {
        case 'ADD-TASK':
            return {
                ...state,
                [todolistID]: [
                    {
                        id: v1(),
                        title: action.title,
                        isDone: false
                    },
                    ...todolistTasks
                ]
            };
        case 'REMOVE-TASK':
            return {
                ...state,
                [todolistID]: todolistTasks.filter(task => task.id !== action.taskID)
            }
        case 'CHANGE-TASK-STATUS':
            return {
                ...state,
                [todolistID]: todolistTasks.map(task => {
                    if (task.id === action.taskID) {
                        return {
                            ...task,
                            isDone: action.taskStatus
                        }
                    }
                    return task
                })
            }
        case 'CHANGE-TASK-TITLE':
            return {
                ...state,
                [todolistID]: todolistTasks.map(task => {
                    if (task.id === action.taskID) {
                        return {
                            ...task,
                            title: action.taskTitle
                        }
                    }
                    return task
                })
            }
        case 'ADD-TODOLIST':
            return {
                ...state,
                [action.todolistID]: []
            }
        case 'REMOVE-TODOLIST':
            const copyState = {...state};
            delete copyState[action.todolistID];
            return copyState;
        default:
            return state;
    }
}

type addTaskActionType = {
    type: 'ADD-TASK'
    title: string
    todolistID: string
}
export const addTaskAC = (title: string, todolistID: string): addTaskActionType => {
    return {
        type: 'ADD-TASK',
        title,
        todolistID
    }
}

type removeTaskActionType = {
    type: 'REMOVE-TASK'
    taskID: string
    todolistID: string
}
export const removeTaskAC = (taskID: string, todolistID: string): removeTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        taskID,
        todolistID
    }
}

type changeTaskStatusActionType = {
    type: 'CHANGE-TASK-STATUS'
    taskID: string
    taskStatus: boolean
    todolistID: string
}
export const changeTaskStatusAC = (taskID: string, taskStatus: boolean, todolistID: string): changeTaskStatusActionType => {
    return {
        type: 'CHANGE-TASK-STATUS',
        taskID,
        taskStatus,
        todolistID,
    }
}

type changeTaskTitleActionType = {
    type: 'CHANGE-TASK-TITLE'
    taskID: string
    taskTitle: string
    todolistID: string
}
export const changeTaskTitleAC = (taskID: string, taskTitle: string, todolistID: string): changeTaskTitleActionType => {
    return {
        type: 'CHANGE-TASK-TITLE',
        taskID,
        taskTitle,
        todolistID
    }
}