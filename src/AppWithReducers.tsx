import React, {useReducer} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC,
    tasksReducer
} from './state/tasks/tasks-reducer';
import {
    addTodolistAC,
    changeTitleTodolistAC,
    changeTodolistFilterAC, removeTodolistAC,
    todolistsReducer
} from './state/todolists/todolists-reducer';

export type TodolistType = {
    id: string
    title: string
    filter: stateTaskType
}
export type TasksType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type stateTaskType = 'all' | 'active' | 'completed';

function AppWithReducers() {
    let TodolistId1 = v1();
    let TodolistId2 = v1();

    let [todoLists, dispatchTodoLists] = useReducer(todolistsReducer, [
        {
            id: TodolistId1,
            title: 'TodoList 1',
            filter: 'all'
        },
        {
            id: TodolistId2,
            title: 'TodoList 2',
            filter: 'active'
        },
    ]);

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [TodolistId1]:
            [
                {
                    id: v1(),
                    title: 'HTML&CSS',
                    isDone: false
                },
                {
                    id: v1(),
                    title: 'JS',
                    isDone: true
                },
                {
                    id: v1(),
                    title: 'React',
                    isDone: false
                }
            ],
        [TodolistId2]:
            [
                {
                    id: v1(),
                    title: 'HTML&CSS',
                    isDone: false
                },
                {
                    id: v1(),
                    title: 'JS',
                    isDone: true
                },
                {
                    id: v1(),
                    title: 'React',
                    isDone: false
                },
                {
                    id: v1(),
                    title: 'React Native',
                    isDone: false
                },
                {
                    id: v1(),
                    title: 'Node JS',
                    isDone: false
                }
            ],
    });

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatchTodoLists(action);
        dispatchTasks(action);
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatchTodoLists(action);
        dispatchTasks(action);
    }

    function changeTitle(id: string, title: string) {
        dispatchTodoLists(changeTitleTodolistAC(id, title));
    }

    function changeFilter(value: stateTaskType, TodoListId: string) {
        dispatchTodoLists(changeTodolistFilterAC(TodoListId, value));
    }

    function addTask(title: string, TodoListId: string) {
        dispatchTasks(addTaskAC(title, TodoListId));
    }

    function changeTitleTask(id: string, TodoListId: string, newTitle: string) {
        dispatchTasks(changeTaskTitleAC(id, newTitle, TodoListId));
    }

    function removeTask(id: string, TodoListId: string) {
        dispatchTasks(removeTaskAC(id, TodoListId));
    }

    function changeStatus(id: string, isDone: boolean, TodoListId: string) {
        dispatchTasks(changeTaskStatusAC(id, isDone, TodoListId));
    }

    return <div className="App">
        <AppBar position={'static'}>
            <Toolbar>
                <IconButton edge={'start'} color={'inherit'} aria-label={'menu'}>
                    <Menu/>
                </IconButton>
                <Typography variant={'h6'}>
                    News
                </Typography>
                <Button color={'inherit'}>Login</Button>
            </Toolbar>
        </AppBar>
        <Container fixed>
            <Grid container style={{padding: '10px'}}>
                <AddItemForm addItemHandler={addTodolist}/>
            </Grid>
            <Grid container spacing={3} style={{justifyContent: 'center'}}>
                {todoLists.map((todoList: TodolistType) => {
                    let filteredTask = tasks[todoList.id];

                    if (todoList.filter === 'active') {
                        filteredTask = tasks[todoList.id].filter((task) => !task.isDone)
                    }

                    if (todoList.filter === 'completed') {
                        filteredTask = tasks[todoList.id].filter((task) => task.isDone)
                    }

                    return (
                        <Grid item key={todoList.id}>
                            <Paper style={{padding: '10px'}}>
                                <Todolist
                                    id={todoList.id}
                                    title={todoList.title}
                                    tasks={filteredTask}
                                    addTask={addTask}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    changeStatus={changeStatus}
                                    changeTitleTask={changeTitleTask}
                                    changeTitle={changeTitle}
                                    filter={todoList.filter}
                                    removeTodolist={removeTodolist}
                                />
                            </Paper>
                        </Grid>
                    )
                })}
            </Grid>
        </Container>
    </div>;
}

export default AppWithReducers;
