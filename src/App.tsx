import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist/Todolist';
import {v1} from 'uuid';
import AddItemForm from './components/AddItemForm/AddItemForm';
import {AppBar, Button, IconButton, Toolbar, Typography, Container, Grid, Paper} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type TodolistType = {
    id: string
    title: string
    filter: stateTaskType
}
type TasksType = {
    [key: string]: Array<TaskType>
}
export type TaskType = {
    id: string,
    title: string,
    isDone: boolean
}
export type stateTaskType = 'all' | 'active' | 'completed';

function App() {

    let TodolistId1 = v1();
    let TodolistId2 = v1();

    let [todoLists, setTodoLists] = useState<Array<TodolistType>>([
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

    let [tasks, setTasks] = useState<TasksType>({
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
            ]
    });

    function addTodolist(title: string) {
        const newTodolist = {
            id: v1(),
            title,
            filter: 'all'
        } as TodolistType
        setTodoLists([newTodolist, ...todoLists]);
        setTasks({...tasks, [newTodolist.id]: []})
    }

    function changeTitle(id: string, title: string) {
        let changedTodolist = todoLists.find((todoList) => todoList.id === id);

        if (changedTodolist) {
            changedTodolist.title = title;
            setTodoLists([...todoLists])
        }
    }

    function changeFilter(value: stateTaskType, TodoListId: string) {
        let todoList = todoLists.find(todoList => todoList.id === TodoListId);
        if (todoList) {
            todoList.filter = value;
            setTodoLists([...todoLists]);
        }
    }

    function addTask(title: string, TodoListId: string) {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        let TodoList = tasks[TodoListId];
        tasks[TodoListId] = [newTask, ...TodoList];
        setTasks({...tasks});
    }

    function changeTitleTask(id: string, TodoListId: string, newTitle: string) {

        let TodoListTasks = tasks[TodoListId];

        let task = TodoListTasks.find((task) => task.id === id);

        if (task) {
            task.title = newTitle;

            setTasks({...tasks});
        }
    }

    function removeTask(id: string, TodoListId: string) {

        let TodoListTasks = tasks[TodoListId];

        tasks[TodoListId] = TodoListTasks.filter((task) => task.id !== id);

        setTasks({...tasks});
    }

    function changeStatus(id: string, isDone: boolean, TodoListId: string) {

        let TodoListTasks = tasks[TodoListId];

        let task = TodoListTasks.find((task) => task.id === id);

        if (task) {
            task.isDone = isDone;

            setTasks({...tasks});
        }
    }

    function removeTodolist(id: string) {
        let FiltredTodoLists = todoLists.filter((todoList) => todoList.id !== id);
        delete tasks[id];
        setTodoLists(FiltredTodoLists);
        setTasks({...tasks});
    }

    return (
        <div className="App">
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
                            <Grid item>
                                <Paper style={{padding: '10px'}}>
                                <Todolist
                                    key={todoList.id}
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
        </div>
    );
}

export default App;
