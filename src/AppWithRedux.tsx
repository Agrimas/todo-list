import React from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';
import {
    addTaskAC,
    changeTaskStatusAC,
    changeTaskTitleAC,
    removeTaskAC
} from './state/tasks/tasks-reducer';
import {
    addTodolistAC,
    changeTitleTodolistAC,
    changeTodolistFilterAC, removeTodolistAC
} from './state/todolists/todolists-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {rootStateType} from './state/store';

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

function AppWithRedux() {
    const todoLists = useSelector<rootStateType, Array<TodolistType>>(state => state.todolists);
    const tasks = useSelector<rootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    function addTodolist(title: string) {
        const action = addTodolistAC(title);
        dispatch(action);
        dispatch(action);
    }

    function removeTodolist(id: string) {
        const action = removeTodolistAC(id);
        dispatch(action);
        dispatch(action);
    }

    function changeTitle(id: string, title: string) {
        dispatch(changeTitleTodolistAC(id, title));
    }

    function changeFilter(value: stateTaskType, TodoListId: string) {
        dispatch(changeTodolistFilterAC(TodoListId, value));
    }

    function addTask(title: string, TodoListId: string) {
        dispatch(addTaskAC(title, TodoListId));
    }

    function changeTitleTask(id: string, TodoListId: string, newTitle: string) {
        dispatch(changeTaskTitleAC(id, newTitle, TodoListId));
    }

    function removeTask(id: string, TodoListId: string) {
        dispatch(removeTaskAC(id, TodoListId));
    }

    function changeStatus(id: string, isDone: boolean, TodoListId: string) {
        dispatch(changeTaskStatusAC(id, isDone, TodoListId));
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

                    return <Grid item key={todoList.id}>
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
                })}
            </Grid>
        </Container>
    </div>;
}

export default AppWithRedux;
